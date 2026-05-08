import { useRef, useCallback } from 'react';

const STORAGE_KEY = 'contact:lastSent';
const DAY_KEY = 'contact:dailyCount';
const COOLDOWN_MS = 60_000; // 60s between submits
const DAILY_LIMIT = 3;
const MIN_FILL_TIME_MS = 3_000; // human typing floor

export interface GuardCheck {
  ok: boolean;
  reason?: string;
}

/**
 * Client-side anti-abuse guard for the contact form:
 *  - honeypot field (silent reject if filled)
 *  - time-trap (must take > 3s to fill)
 *  - per-browser cooldown + daily cap (localStorage)
 *
 * NOTE: Lovable's backend has no rate-limiting primitives,
 * so this is best-effort defense in depth — sophisticated
 * bots can still bypass localStorage gates. Cloudflare
 * Turnstile (when configured) handles the real bot wall.
 */
export function useContactGuard() {
  const mountedAt = useRef(Date.now());
  const honeypot = useRef('');

  const setHoneypot = (v: string) => {
    honeypot.current = v;
  };

  const check = useCallback((): GuardCheck => {
    if (honeypot.current.trim().length > 0) {
      // Pretend success — bot doesn't learn anything
      return { ok: false, reason: 'silent' };
    }

    const elapsed = Date.now() - mountedAt.current;
    if (elapsed < MIN_FILL_TIME_MS) {
      return { ok: false, reason: 'Please take a moment to review your message before sending.' };
    }

    try {
      const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
      const since = Date.now() - last;
      if (last && since < COOLDOWN_MS) {
        const wait = Math.ceil((COOLDOWN_MS - since) / 1000);
        return { ok: false, reason: `Cooldown active. Try again in ${wait}s.` };
      }

      const todayKey = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(DAY_KEY);
      const parsed = raw ? JSON.parse(raw) as { date: string; count: number } : null;
      const count = parsed && parsed.date === todayKey ? parsed.count : 0;
      if (count >= DAILY_LIMIT) {
        return { ok: false, reason: 'Daily message limit reached. Please email me directly.' };
      }
    } catch {
      // localStorage unavailable — fail open
    }

    return { ok: true };
  }, []);

  const recordSend = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      const todayKey = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(DAY_KEY);
      const parsed = raw ? JSON.parse(raw) as { date: string; count: number } : null;
      const count = parsed && parsed.date === todayKey ? parsed.count + 1 : 1;
      localStorage.setItem(DAY_KEY, JSON.stringify({ date: todayKey, count }));
    } catch {
      // ignore
    }
  }, []);

  return { check, recordSend, setHoneypot };
}
