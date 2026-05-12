
## Goals

1. Fix the "curved buttons" regression — they're too small, low-contrast, and visually merge into the terminal background.
2. Make the mobile contact form sendable via the phone keyboard's Enter/Go key (no need to tap "Send [Ctrl+Enter]").
3. Raise overall UI quality: motion-graphics polish on every page, tighter spacing, no dead whitespace, full responsive parity.

## 1. Button system rebuild (`src/components/ui/button.tsx`)

Problem: Last pass turned default buttons into low-contrast pills that disappear against dark glass.

- Restore proper sizing: `default` h-11 px-6, `lg` h-12 px-8, `sm` h-9 px-4, `icon` size-10. Min `min-w-[44px]` for tap targets.
- Keep `rounded-full` but bump weight to `font-semibold tracking-tight`.
- `default` variant: solid `bg-hacker-green text-black` with `shadow-[0_0_0_1px_hsl(var(--hacker-green)/0.6),0_8px_28px_-8px_hsl(var(--hacker-green)/0.55)]`, hover lifts shadow and brightens.
- `outline` variant: `border-2 border-hacker-green/70 text-hacker-green bg-black/40 backdrop-blur-md hover:bg-hacker-green/15` — must remain visible on dark glass.
- `ghost` and `link` get readable contrast tokens.
- `glow` variant kept but contrast-checked against terminal panel bg.
- Add `:focus-visible` ring `ring-2 ring-hacker-green ring-offset-2 ring-offset-background`.
- Audit terminal "Send [Ctrl+Enter]" pill in `TerminalContactForm.tsx` — replace with new outline variant so it's clearly visible.

## 2. Mobile Enter-to-send for contact form (`src/components/forms/TerminalContactForm.tsx`)

Problem: textarea only submits on Ctrl+Enter; mobile keyboards can't send Ctrl, so the user must hunt for a button.

- Detect mobile via existing `useMediaQuery`/`use-mobile` hook.
- On mobile: replace the textarea's "Enter = newline" behavior with `Enter = submit`, and offer a small "↵ newline" hint plus `Shift+Enter` for newline (works on most mobile keyboards with shift).
- Set `enterKeyHint="send"` on the textarea so mobile keyboards render a "Send" key label.
- Set `inputMode` properly on each step (`email`, `numeric` for type select).
- Keep the visible "Send" button as a fallback, but enlarge it (h-11, full-width on mobile) using the new button system.
- Also wire `<form onSubmit>` semantics on inputs so the keyboard "Go"/"Done" key naturally submits.

## 3. Global UI polish + motion graphics

Scope: every page (Home, About, Portfolio, ProjectDetail, Skills, Resume, Blog, BlogPost, Contact, Accessibility, NotFound).

- Standardize section spacing tokens in `src/index.css`:
  - `--section-y-mobile: 3rem`, `--section-y-desktop: 5rem`
  - utility class `.section-y` → `py-12 md:py-20`
- Sweep pages and replace ad-hoc `py-24/py-32` with `.section-y`; collapse stacked empty `<div>` spacers.
- Tighten container: standardize on `container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl` everywhere via a shared `<Section>` wrapper component (new: `src/components/layout/Section.tsx`).
- Motion graphics layer (framer-motion, already installed):
  - Shared `FadeUp`, `StaggerGroup`, `Reveal` primitives in `src/components/effects/Motion.tsx`.
  - Apply `whileInView` reveal on every section heading + first content row; `viewport={{ once: true, margin: '-10%' }}`.
  - Add subtle parallax on hero blocks of About / Portfolio / Skills / Blog pages (translateY on scroll, ≤ 30px, disabled under `prefers-reduced-motion`).
  - Card hover micro-interaction (lift + green glow ring) standardized via a `.card-interactive` class.
- Keep the existing global `Scene3D` cinematic background; ensure pages don't paint opaque blocks over it (audit `bg-background` walls; switch large containers to `bg-background/60 backdrop-blur-xl` glass).

## 4. Responsive QA + spacing audit

Viewports to verify with browser tools after build: 360, 390, 414, 768, 820, 1024, 1280, 1440.

Checklist per viewport:
- No horizontal scroll
- Header fits, terminal toggle doesn't overlap content/footer
- Stat counters not clipped
- Marketing posters (Hero / FeatureComparison / Testimonial) reflow cleanly
- Contact terminal: keyboard "Send" works, Turnstile widget not overflowing
- Footer uptime bar visible, not overlapped by Lovable badge

Fix any issues found in the same pass.

## 5. Out of scope

- No backend / EmailJS / Turnstile config changes (server route already hardened last turn).
- No new pages or routes.
- No content rewrites — visual + interaction polish only.

## Files

**New**
- `src/components/layout/Section.tsx` — shared section wrapper
- `src/components/effects/Motion.tsx` — FadeUp/Stagger/Reveal primitives

**Edited**
- `src/components/ui/button.tsx` — sizing + contrast restoration
- `src/components/forms/TerminalContactForm.tsx` — mobile Enter-to-send, enterKeyHint, larger send button
- `src/components/forms/ContactForm.tsx` — enterKeyHint on submit
- `src/index.css` — spacing tokens, glass utilities, motion-safe rules
- All `src/pages/*.tsx` — adopt `<Section>`, apply motion primitives, remove dead spacing
- `src/components/layout/Footer.tsx`, `Header.tsx` — spacing tightening if needed
