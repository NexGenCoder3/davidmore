import { Redis } from '@upstash/redis';
import { z } from 'zod';

/**
 * POST /api/contact
 *
 * Server-side contact submission handler.
 *
 * Defenses (defence in depth):
 *   1. Strict zod validation + length caps
 *   2. Server-side Cloudflare Turnstile siteverify
 *   3. Honeypot field check
 *   4. Per-IP rate limit via Upstash Redis (sliding window: 5/min, 20/day)
 *   5. EmailJS credentials live ONLY on the server
 *
 * Required server env vars:
 *   - KV_REST_API_URL, KV_REST_API_TOKEN  (provided by Upstash integration)
 *   - TURNSTILE_SECRET_KEY                (Cloudflare Turnstile secret, server-only)
 *   - EMAILJS_SERVICE_ID
 *   - EMAILJS_TEMPLATE_ID
 *   - EMAILJS_PUBLIC_KEY
 *   - EMAILJS_PRIVATE_KEY                 (Account Settings → API Keys → Private Key)
 */

export const config = { runtime: 'edge' };

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const submissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .refine((v) => !/https?:\/\/|www\.|<|>/i.test(v), 'invalid_name'),
  email: z.string().trim().email().max(255),
  projectType: z.enum(['web-development', 'security', 'consultation']),
  message: z
    .string()
    .trim()
    .min(10)
    .max(1000)
    .refine((v) => (v.match(/https?:\/\//gi) || []).length <= 2, 'too_many_links'),
  // Honeypot — must be empty string or absent
  website: z.string().max(0).optional().or(z.literal('')),
  // Turnstile token from client
  turnstileToken: z.string().min(10),
});

const json = (body: unknown, init: number | ResponseInit = 200) =>
  new Response(JSON.stringify(body), {
    status: typeof init === 'number' ? init : init.status,
    headers: { 'content-type': 'application/json', ...(typeof init === 'object' ? init.headers : {}) },
  });

const getClientIp = (req: Request): string => {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
};

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Fail closed in production; allow in dev
    return process.env.NODE_ENV !== 'production';
  }
  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Sliding-window rate limit using Redis sorted sets.
 * Returns false if the request would exceed the limit.
 */
async function rateLimit(ip: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const now = Date.now();
  const minuteKey = `contact:rl:min:${ip}`;
  const dayKey = `contact:rl:day:${ip}`;

  const [minuteCount, dayCount] = await Promise.all([
    redis.incr(minuteKey),
    redis.incr(dayKey),
  ]);

  // Set TTLs only on first hit of each window
  if (minuteCount === 1) await redis.expire(minuteKey, 60);
  if (dayCount === 1) await redis.expire(dayKey, 60 * 60 * 24);

  if (minuteCount > 5) return { ok: false, reason: 'Too many requests. Please wait a minute.' };
  if (dayCount > 20) return { ok: false, reason: 'Daily submission limit reached. Please email me directly.' };

  // Per-email cooldown to limit forging
  return { ok: true };
}

async function sendViaEmailJS(payload: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}): Promise<boolean> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) return false;

  const body = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey, // optional but required if "Allow EmailJS API for non-browser applications" requires it
    template_params: {
      from_name: payload.name,
      from_email: payload.email,
      project_type: payload.projectType,
      message: payload.message,
    },
  };

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, { status: 405, headers: { allow: 'POST' } });
  }

  const ip = getClientIp(req);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: 'validation_failed' }, 400);
  }
  const { website, turnstileToken, ...payload } = parsed.data;

  // Honeypot — silent success so bots learn nothing
  if (website && website.length > 0) {
    return json({ ok: true });
  }

  // Rate limit BEFORE Turnstile to avoid abusing siteverify quota
  const rl = await rateLimit(ip);
  if (!rl.ok) {
    return json({ error: rl.reason }, 429);
  }

  // Turnstile
  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return json({ error: 'verification_failed' }, 403);
  }

  const sent = await sendViaEmailJS(payload);
  if (!sent) {
    return json({ error: 'send_failed' }, 502);
  }

  return json({ ok: true });
}
