## Goal
Add a user-facing toggle to enable/disable the global `Scene3D` cinematic background, with sensible defaults that respect `prefers-reduced-motion`, touch/low-power, and missing WebGL.

## Changes

1. **New hook** `src/hooks/useScene3DPreference.ts`
   - Mirrors `useCursorPreference` shape: `{ pref: 'auto' | 'on' | 'off', enabled, toggle, setPref }`.
   - Persists to `localStorage` under `scene3d-pref`.
   - `'auto'` (default) runs the existing capability checks (reduced-motion, touch+small/low-cpu, WebGL probe) and resolves to on/off.
   - `'on'` forces on (still blocked only if WebGL is unavailable).
   - `'off'` forces off.

2. **Refactor** `src/components/effects/Scene3D.tsx`
   - Replace the local `enabled` state with `useScene3DPreference().enabled`.
   - Keep the same lazy/Suspense render path; no visual change when enabled.

3. **UI toggle** in `src/components/effects/StatusWidget.tsx`
   - Add a sibling pill next to the existing cursor toggle: `3d: [auto|on|off]`.
   - Click cycles `auto → on → off → auto`.
   - Same glass styling, same `hidden lg:flex` container (desktop only, matching the existing widget — mobile keeps the auto default for performance).

4. **Test** `src/hooks/useScene3DPreference.test.ts`
   - Default is `'auto'`, toggle cycles through the three states and persists.

## Notes
- No new dependencies.
- Reduced-motion and low-power still win by default (`auto`), so the toggle is purely opt-in for users who want to force the effect on or off.
- Does not touch `Layout.tsx`; `<Scene3D />` stays mounted and self-gates internally.
