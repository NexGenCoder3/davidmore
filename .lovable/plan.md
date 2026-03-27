

# Comprehensive Visual Overhaul: Back Navigation, Animated Backgrounds, Color Palette Fix

## Issues Identified

1. **No back/return navigation** on inner pages (About, Contact, Skills, Blog, Portfolio, ProjectDetail, BlogPost)
2. **No animated background** on non-home pages — they feel flat/static compared to the hero
3. **Green color palette** feels unprofessional — the light/dark mode greens blend together and look muddy

---

## 1. Breadcrumb / Back Navigation on Every Page

Add a consistent back-navigation bar below the header on all inner pages.

**Create `src/components/layout/Breadcrumb.tsx`:**
- Shows `< Back` button (using `useNavigate(-1)`) plus current page name
- Sticky below header, subtle glass-morphic bar with `backdrop-blur`
- Monospace font, hacker-themed: `~/portfolio` or `~/about`
- Appears on all pages except Home (`/`)

**Update pages:** Add `<Breadcrumb>` inside each page's hero section (About, Contact, Skills, Blog, BlogPost, Portfolio, ProjectDetail, Resume, Accessibility). Alternatively, add it globally in `Layout.tsx` so it auto-renders based on route.

**Better approach — add to Layout.tsx globally:**
- Render `<Breadcrumb />` inside `<main>` when `pathname !== '/'`
- This avoids touching every page file

---

## 2. Animated Background for Non-Home Pages

Home has MatrixRain. Other pages feel dead. Add a subtle, performant animated background.

**Create `src/components/effects/NetworkGrid.tsx`:**
- Canvas-based animated mesh/network of dots connected by faint lines
- Dots drift slowly, connections form/break based on proximity
- Very subtle: dots at 8-12% opacity, lines at 4-6% opacity
- Uses `requestAnimationFrame`, pauses when tab not visible
- Color: uses CSS variable `--hacker-green` so it adapts to theme
- Only renders on desktop (same pattern as `GradientOrbs`)

**Update `Layout.tsx`:**
- Import `NetworkGrid`
- Render it behind content (z-0) on non-home pages
- Home page keeps its existing `MatrixRain`

---

## 3. Color Palette Overhaul — Professional Dark/Light Modes

The current palette uses green for both `--background` and `--primary`, making everything blend. Fix:

**Light Mode (`index.css` `:root`):**
- `--background`: `hsl(0 0% 100%)` (clean white, not green)
- `--foreground`: `hsl(0 0% 9%)` (near black)
- `--card`: `hsl(0 0% 98%)` (off-white)
- `--card-foreground`: `hsl(0 0% 9%)`
- `--muted`: `hsl(0 0% 96%)`
- `--muted-foreground`: `hsl(0 0% 45%)`
- `--border`: `hsl(0 0% 90%)`
- `--primary` stays `hsl(142 70% 45%)` (the accent green)
- `--accent`: `hsl(142 40% 95%)` (very light green tint)
- `--secondary`: `hsl(0 0% 96%)`

**Dark Mode (`.dark`):**
- `--background`: `hsl(0 0% 4%)` (near black, not green-tinted)
- `--foreground`: `hsl(0 0% 98%)`
- `--card`: `hsl(0 0% 7%)`
- `--muted`: `hsl(0 0% 12%)`
- `--muted-foreground`: `hsl(0 0% 55%)`
- `--border`: `hsl(0 0% 15%)`
- `--primary` stays `hsl(142 70% 50%)` (bright accent green)
- `--accent`: `hsl(142 30% 10%)`

**Key principle:** Backgrounds and surfaces are neutral (white/gray/black). Green is used ONLY as an accent color for interactive elements, highlights, and the hacker-themed sections (terminal, skills, blog). This creates contrast and makes the green pop instead of everything being green soup.

---

## 4. Header Text Color Fix

Currently nav links are hardcoded `text-white` which won't work on light backgrounds.

**Update `Header.tsx`:**
- Change desktop nav link color from `text-white` to adapt: use `text-foreground` when scrolled/non-home, `text-white` only on transparent home hero state

---

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/layout/Breadcrumb.tsx` |
| Create | `src/components/effects/NetworkGrid.tsx` |
| Update | `src/components/layout/Layout.tsx` (add Breadcrumb + NetworkGrid) |
| Update | `src/index.css` (color palette overhaul) |
| Update | `src/components/layout/Header.tsx` (adaptive text color) |

No new dependencies.

