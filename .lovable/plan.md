# Add Terminal Loading Screen + Custom Animated Cursor

Two missing features from the previous task, implemented surgically.

## 1. Terminal Loading Screen Between Routes

A brief (~650ms) terminal-style overlay that appears on every route change, layered **above** the existing slat page transitions so both effects compose nicely.

### New file: `src/components/ui/RouteLoader.tsx`

- Listens to `useLocation().pathname`; on change, shows for 650ms then auto-fades
- z-index `[200]` (existing slats are `[100]`, so loader sits on top — they play simultaneously)
- Centered terminal panel:
  - Title bar with red/yellow/green dots and `guest@dm:~$ load <route>`
  - Three sequentially-revealed lines: `> mounting <route>...`, `> establishing connection... [OK]`, `> rendering view... [OK]`
  - Animated progress bar filling 0→100% over the duration
  - Pulsing cursor block
- Scanline texture overlay for CRT vibe
- `pointer-events-none` so it never blocks the underlying transition
- Respects `prefers-reduced-motion` → returns null

### Wire-up in `src/App.tsx`

Mount `<RouteLoader />` inside `<BrowserRouter>` (so it has access to `useLocation`), right next to `<ScrollToTop />`.

## 2. Custom Animated Cursor

### New file: `src/components/effects/CustomCursor.tsx`

Two-layer cursor (desktop only):
- **Inner dot** (6px green, glowing) — tracks mouse exactly via `transform: translate3d`
- **Outer ring** (32px, primary border) — eases toward target with lerp 0.18 in a `requestAnimationFrame` loop

State morphs based on hovered element:
- **Default**: dot + thin ring
- **Pointer** (over `a, button, [role=button]`, etc.): ring grows to 48px, fills with `primary/18`, glows; dot hides
- **Text** (over `input`, `textarea`): ring becomes a thin vertical I-beam (4×26px, solid primary)
- **Pressed** (mousedown): ring scales to 0.85 briefly

Uses `mix-blend-difference` on the ring so it stays visible on any background.

### Disabled when:
- Touch device: `(pointer: coarse)` matches
- `prefers-reduced-motion: reduce` is set

### Wire-up in `src/components/layout/Layout.tsx`

Add `<CustomCursor />` next to the existing `<CursorTrail />`. Both coexist — trail is `z-[9999]`, custom cursor is `z-[10000]`.

### CSS in `src/index.css`

Append:
```css
html.has-custom-cursor,
html.has-custom-cursor * {
  cursor: none !important;
}
@media (pointer: coarse) {
  html.has-custom-cursor,
  html.has-custom-cursor * {
    cursor: auto !important;
  }
}
```

The `CustomCursor` component adds the `has-custom-cursor` class on mount and removes it on unmount.

## Verification

After build I'll:
1. Confirm `bunx tsc --noEmit` and `bun run build` pass
2. Manually trace: navigate Home → Portfolio → About → confirm loader appears each time, sits above slats, both finish cleanly
3. Confirm cursor morphs over the nav links, the magnetic CTA buttons, and the contact-form inputs

## Files

| File | Change |
|---|---|
| `src/components/ui/RouteLoader.tsx` | **new** — terminal loading overlay |
| `src/components/effects/CustomCursor.tsx` | **new** — dot+ring cursor |
| `src/App.tsx` | mount `<RouteLoader />` inside `BrowserRouter` |
| `src/components/layout/Layout.tsx` | mount `<CustomCursor />` |
| `src/index.css` | hide native cursor when custom cursor is active |
