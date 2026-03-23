

# Cinematic Page Transition + Portfolio Upgrades + Scroll Fix

## 4 Changes in This Implementation

---

### 1. Premium Cinematic Page Transition (complete rewrite)

Replace the two flat `scaleX` bars with a multi-layer, multi-phase cinematic transition system.

**Architecture:** Create a `usePageTransition` hook + completely rewrite `PageTransition.tsx`.

**Layers (bottom to top):**

- **5 diagonal slats** — staggered strips with `skewX(-12deg)`, each offset by 0.04s, sweep across screen. Each slat gets micro-jitter: random ±2-6px offset, ±0.01s delay variation, ±1deg rotation — making it feel alive, not robotic
- **CRT scanline overlay** — repeating-linear-gradient texture that flashes briefly (120ms) during mid-transition
- **Film grain** — noise texture at 3% opacity during transition for cinematic feel
- **Terminal text flash** — centered monospace text showing route-aware message (e.g., `> cd /portfolio`) that appears mid-transition for ~200ms
- **Chromatic aberration edge** — RGB split (1-2px offset) on screen edges for ~120ms during glitch phase
- **Final cursor blink** — a single `> _` blink in center before new page reveals (the signature move)

**Motion intelligence (what makes this expensive-feeling):**

- **Context-aware direction:** Track navigation direction via `useLocation` history. Forward nav → slats sweep left-to-right. Back nav → right-to-left
- **Micro-jitter per slat:** Randomized offset, delay, rotation on each slat so no two transitions look identical
- **Depth blur on exit:** Exiting page gets `filter: blur(2px→6px)` + `scale(1→0.97)` — content "falls away"
- **Luminance pulse on enter:** New page gets a brief `brightness(1.08)` pulse that decays — a snap-to-focus feel
- **Reduced motion fallback:** If `prefers-reduced-motion`, skip to simple 200ms fade

**Files:**
- Rewrite `src/components/ui/PageTransition.tsx`
- Create `src/hooks/usePageTransition.ts` — tracks nav direction, provides transition config
- Update `src/index.css` — add `.scanlines`, `.film-grain` utility classes

---

### 2. Scroll-to-Top Fix

Pages currently open at whatever scroll position the previous page had.

- Create `src/components/utils/ScrollToTop.tsx` — uses `useLocation` + `useEffect` to call `window.scrollTo(0, 0)` on pathname change
- Add inside `BrowserRouter` in `App.tsx`

---

### 3. Category Filter Bar on Portfolio

Wire up the existing `CategoryFilter` component above the masonry grid.

- Add `activeCategory` state to `Portfolio.tsx`
- Define categories from project data (All, Security, Tools, Automation, Web Apps, Open Source)
- Filter projects via existing `getProjectsByCategory` before passing to `MasonryGrid`
- Add `AnimatePresence` with key on active category for smooth grid transitions

---

### 4. Animated Stats Counter

Add a stats section between the hero and project grid on Portfolio.

- Create `src/components/portfolio/StatsCounter.tsx`
- Three glass cards in a row: "8+ Projects", "6+ Technologies", "3+ Years"
- Numbers animate from 0 to target using `useSpring` + `useInView` (Framer Motion)
- Glass card styling consistent with existing `GlassCard` component

---

## Files Summary

| Action | File |
|--------|------|
| Create | `src/hooks/usePageTransition.ts` |
| Create | `src/components/utils/ScrollToTop.tsx` |
| Create | `src/components/portfolio/StatsCounter.tsx` |
| Rewrite | `src/components/ui/PageTransition.tsx` |
| Update | `src/App.tsx` (add ScrollToTop) |
| Update | `src/pages/Portfolio.tsx` (filter + stats) |
| Update | `src/index.css` (scanlines, grain utilities) |

No new dependencies.

