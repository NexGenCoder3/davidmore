# Plan: Security hardening, portrait swap, button refresh, polish pass

## 1. Replace portrait image (camera/woman → suit photo)

- Copy `user-uploads://file_000000000858720aba3a870c39cf9bc0.png` into `src/assets/portrait.png`.
- Update `src/data/developer.ts` → `portraitImage` to the imported asset.
- Verify `About.tsx` and `SEOHead` pick it up with no other Unsplash references left.

## 2. Contact form abuse protection

EmailJS credentials live in the client bundle by design (EmailJS public keys are allow-listed by domain), but bots can still drain the quota. We will layer ad‑hoc client-side defences. **Note:** Lovable's backend has no proper rate-limiting primitives, so true per-IP throttling is not part of this plan — I'll flag this clearly. If you want server-side enforcement later, the right move is to migrate the send through a Lovable Cloud edge function.

Changes to `src/components/forms/TerminalContactForm.tsx` (and `ContactForm.tsx`):

- **Honeypot field**: hidden `<input name="website">` with `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`. If filled, silently "succeed" without sending.
- **Time-trap**: record mount timestamp; reject submissions completed in < 3 s.
- **Per-browser cooldown**: localStorage key `contact:lastSent`. Block resubmits within 60 s and limit to 3 sends per 24 h. Show a friendly terminal line `ERROR: cooldown active (Xs remaining)`.
- **Cloudflare Turnstile (invisible)**: add `@marsidev/react-turnstile` and render an invisible widget. Submit only fires after a token is returned. Site key stored as `VITE_TURNSTILE_SITE_KEY` (publishable, safe in bundle). Token is sent as `turnstile_token` template param so EmailJS receives it (validation is soft — without a backend we can't verify, but the widget itself blocks most bots).
- **Input hardening**: tighten zod regex (no URLs in `name`, max consecutive whitespace, strip control chars). Reject messages with > 3 URLs.

I'll mention the no-backend-rate-limiting caveat in the response and offer to follow up with a proper edge-function-based send + Turnstile verification.

## 3. Curvier, more modern buttons (SaaS/dev tone)

- `src/components/ui/button.tsx`:
  - Base radius `rounded-md` → `rounded-full` for `default`/`secondary`/`destructive`, `rounded-2xl` for `outline`.
  - Add `font-medium tracking-tight`, subtle `shadow-[0_0_0_1px_rgba(34,197,94,0.15),0_8px_24px_-12px_rgba(34,197,94,0.4)]` on default.
  - Add `hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`.
  - New gradient variant `glow`: `bg-gradient-to-b from-hacker-green to-hacker-green/80 text-black hover:shadow-[0_0_24px_rgba(34,197,94,0.45)]`.
  - Sizes: `h-10` → `h-11` for default, `lg` → `h-12 px-9`, `sm` → `h-9 px-4`.
- Audit ad-hoc buttons (terminal "Send [Ctrl+Enter]", category filter chips, hero CTAs) to use `rounded-full` and the new glow variant where they are primary.

## 4. Reverse-engineered polish (bugs visible in screenshots)

```text
[About page mobile]   white gradient band above portrait — caused by
                      vignette pulse leaking into the section. Fix by
                      scoping the radial gradient to the hero only.
[Portfolio mobile]    "12+" stat is clipped — fixed-height card cuts the
                      counter. Switch to min-h + py to allow growth.
[Header mobile]       "Available" pill + theme + menu overflow at 360px.
                      Hide pill < sm:, show small green dot instead.
[Filter chips]        Touch targets < 40px on mobile. Bump to h-10 and
                      rounded-full for parity with new button system.
[Command terminal]    Toggle button overlaps Portfolio "+N" badge. Move
                      to bottom-28 on mobile, keep bottom-24 desktop.
[Layout]              Some pages still allow horizontal scroll on iOS.
                      Add overscroll-behavior-x: contain on body.
```

## 5. GitHub sync

Git is managed by Lovable automatically — every change in this loop is committed and pushed to your connected GitHub repo. No manual sync needed. I'll confirm in the final response.

## Technical details

**New deps**: `@marsidev/react-turnstile` (~3 kB).

**New env (publishable, safe to commit)**:
```
VITE_TURNSTILE_SITE_KEY=<your Cloudflare Turnstile site key>
```
I'll wire the component to render only when the env var is set, so the form keeps working in dev without a key (honeypot + time-trap + cooldown still apply).

**Files to be created**
- `src/assets/portrait.png` (copied from upload)
- `src/hooks/useContactGuard.ts` (honeypot + time-trap + cooldown helpers)

**Files to be edited**
- `src/data/developer.ts`
- `src/components/forms/TerminalContactForm.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/components/ui/button.tsx`
- `src/components/portfolio/CategoryFilter.tsx`
- `src/components/portfolio/StatsCounter.tsx`
- `src/components/layout/Header.tsx`
- `src/components/effects/CommandTerminal.tsx`
- `src/index.css` (overscroll, scoped vignette)
- `.env.example`

**What I will NOT do**
- Backend/IP rate limiting (no primitives available — would be ad-hoc and ineffective).
- Server-side Turnstile token verification (requires the edge-function migration mentioned above; happy to do as a follow-up if you confirm).

After implementation I'll run the existing Vitest suite and verify the About + Portfolio + Contact pages at 360, 768, and 1280 widths.