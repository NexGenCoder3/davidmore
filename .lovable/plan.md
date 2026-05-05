# Cinematic Polish: Harden Loader, Cursor & Add User Controls

Most of the items you listed (custom cursor, route loader, slat transitions, reduced-motion guards) are already wired in. The remaining gaps are **edge cases, user controls, tests, and cinematic refinement**. This plan tackles them surgically.

## 1. RouteLoader edge cases

File: `src/components/ui/RouteLoader.tsx`

Current bug: rapid navigation can leave the previous timeout running and an `<AnimatePresence>` mid-exit, causing flicker / stuck overlay.

Fixes:
- Track timeout in a `useRef`; clear it before scheduling a new one (already partially handled by cleanup, but the `key` bump can race with `exit` animation — make exit non-blocking with `mode="popLayout"`).
- Cap minimum visible time at 350ms even on rapid changes so the slat transition (≈700ms) and the loader compose cleanly without "double animation" feel.
- Skip the loader on the very first mount (boot sequence already covers that).
- Guard `prefers-reduced-motion` reactively by listening to `matchMedia` change events instead of reading once.

## 2. Custom cursor — user setting + a11y

Files: `src/components/effects/CustomCursor.tsx`, new `src/hooks/useCursorPreference.ts`, `src/components/layout/Header.tsx` (or Footer settings area).

- New hook `useCursorPreference()` reads/writes `localStorage["custom-cursor"]` (`'on' | 'off'`, default `on`).
- `CustomCursor` early-returns when preference is `off`, touch device, or reduced-motion. It also removes `has-custom-cursor` class so the native cursor returns.
- Add a small toggle in the existing `StatusWidget` (already a settings-style HUD) labeled `cursor: [native|custom]` so it stays on-theme.
- Keyboard-nav fix: when any element receives `:focus-visible`, hide both ring & dot (via a `focus-within` listener that toggles a CSS class) so the focus ring is never obscured.
- Ensure `pointer-events-none` is on the wrapper and verify `aria-hidden` (already set).

## 3. Reduced-motion fallback (verify + tighten)

- `RouteLoader`: when reduced-motion, render a static 250ms green underline at the top of the viewport (clear page-change indicator) instead of returning `null`. Keeps UX legible without animation.
- `CustomCursor`: stays disabled under reduced-motion (already correct).
- `PageTransition`: already handles reduced-motion with a fade — leave as-is.

## 4. Cinematic polish (building on existing work)

Small, high-impact additions — no new heavy libs:
- **Loader → slat handoff timing**: shift slat transition `delay` reference so the loader fades out exactly as slats begin retracting. Tune `DURATION` 650ms → 600ms and add `exit` of 220ms.
- **Hero cinematic intro** (`src/pages/Home.tsx`): add a one-shot subtle vignette pulse + letter-by-letter reveal on the H1 using existing `framer-motion` (no new deps).
- **Section dividers**: ensure `SectionDivider` triggers via `whileInView` with `once: true` (verify, fix if not).
- **CRT flicker on route change**: brief 80ms brightness pulse on `<main>` synced with loader entry — pure CSS keyframe, gated by reduced-motion.
- **MagneticButton**: clamp magnet strength on small viewports (`<768px` → 0) so mobile feels native.

## 5. End-to-end tests

Add Vitest + Testing Library setup (per existing testing guide) and unit-level integration tests — full Playwright e2e is out of scope for this pass; these cover the listed behaviors:

New files:
- `vitest.config.ts`, `src/test/setup.ts`
- `src/components/ui/RouteLoader.test.tsx`: mounts with `MemoryRouter`, asserts overlay appears on path change, disappears within 1s, handles 3 rapid changes without leaving overlay.
- `src/components/effects/CustomCursor.test.tsx`: asserts disabled on touch (mock matchMedia), asserts mode switches to `pointer` when hovering an `<a>`, to `text` over `<input>`.
- `src/hooks/useCursorPreference.test.ts`: localStorage round-trip.

## 6. Files

| File | Change |
|---|---|
| `src/components/ui/RouteLoader.tsx` | edit: rapid-nav guard, min-visible-time, reactive reduced-motion, static fallback |
| `src/components/effects/CustomCursor.tsx` | edit: preference + focus-visible hide |
| `src/hooks/useCursorPreference.ts` | new |
| `src/components/effects/StatusWidget.tsx` | edit: add cursor toggle row |
| `src/pages/Home.tsx` | edit: hero letter reveal + vignette pulse |
| `src/components/effects/MagneticButton.tsx` | edit: mobile clamp |
| `src/index.css` | edit: focus-visible cursor hide rule, CRT pulse keyframe |
| `vitest.config.ts`, `src/test/setup.ts` | new |
| `src/components/ui/RouteLoader.test.tsx` | new |
| `src/components/effects/CustomCursor.test.tsx` | new |
| `src/hooks/useCursorPreference.test.ts` | new |

## Verification

After implementation: run `bunx vitest run`, then manually navigate Home → Portfolio → About in quick succession and confirm no stuck overlay; toggle the cursor setting in StatusWidget; toggle OS reduced-motion and reload; tab through the nav with keyboard and confirm focus ring is fully visible.
