## Goal
Two parallel tracks:
1. Make every page feel as cinematic and 3D as Home, fix mobile spacing/overflow issues seen in the screenshots, and verify across all breakpoints.
2. Add three new in-app marketing sections — hero poster, feature comparison chart, testimonial quote card — in monochrome-green + frosted-glass styling.

---

## Track A — Cinematic 3D + Responsive Polish

### A1. Shared 3D scene background (new)
- New `src/components/effects/Scene3D.tsx` using `@react-three/fiber@^8.18` + `@react-three/drei@^9.122` + `three@^0.160`.
- A reusable, lightweight scene: low-poly wireframe terrain or rotating green wireframe icosahedron with subtle bloom, anchored as a fixed background layer behind page content (z-index below CRT overlay, above page bg).
- Auto-disables on `prefers-reduced-motion`, `pointer: coarse` + small viewport, and when WebGL unavailable (canvas context probe). CPU fallback = existing `NetworkGrid`.
- Mounted once in `Layout.tsx` so all routes inherit it (no per-page double-mount, no flicker on route change).
- DPR clamped to `[1, 1.5]`, `frameloop="demand"` updated on scroll/route change to keep mobile cool.

### A2. Per-page cinematic treatments
Apply consistent motion vocabulary already established on Home to every page:
- **Portfolio, About, Skills, Blog, Contact, Resume, ProjectDetail, BlogPost, Accessibility, NotFound**: add an entrance `LetterReveal` for the page H1, a one-shot vignette pulse, and a `ParallaxSection` wrapper around the hero block.
- Convert primary cards (`ProjectCard`, `MasonryCard`, `BlogCard`, `TestimonialCard`, `SkillCategory`) to use a shared `Tilt3DCard` wrapper (new) — perspective hover tilt with `transform-style: preserve-3d`, depth-shadow, glare highlight. Disabled on touch + `prefers-reduced-motion`.
- Section dividers and stat counters get `whileInView` reveal with `once: true` to avoid re-triggering.

### A3. Mobile responsive sweep (priority: all breakpoints)
Issues visible in screenshots: tag chips overflow card bounds, "min read" stat column too narrow causing 3-line wrap, Command Terminal toggle overlapping content, large blank padding under blog list.
Fixes:
- `BlogCard.tsx`: switch tag row to `flex-wrap gap-1.5 max-w-full` with `overflow-hidden`; cap visible tags to 3 on `< 400px` with "+N" pill; widen the "min read" column or stack icon above text.
- `Layout.tsx` / `Footer.tsx`: replace fixed bottom padding with `pb-[env(safe-area-inset-bottom)]`; remove the dead-space gap between last card and footer (`min-h-screen` → `min-h-[calc(100dvh-var(--header))]`).
- `CommandTerminal.tsx` floating button: move out of card overlap zone on `<420px` (anchor to `bottom-20 right-3`, smaller hitbox).
- `Header.tsx`: tighten mobile nav spacing, ensure logo + buttons fit within 360px without horizontal scroll.
- Audit every page for `px-` values and standardize on `px-4 sm:px-6 lg:px-8`.
- Add a global `overflow-x-clip` on `body` to prevent horizontal scroll.

### A4. Verification
- Run the existing Vitest suite + add 2 new tests:
  - `Scene3D.test.tsx`: mounts on desktop, returns null on touch/reduced-motion.
  - `Tilt3DCard.test.tsx`: applies tilt on hover, no-op on touch.
- Browser verify at viewports: 360, 414, 768, 1024, 1440, 1920. Screenshot each and confirm no overflow, no double-loaders, no flicker between routes.

---

## Track B — Three Marketing Sections (in-app)

All built as components and composed into a new `<MarketingShowcase />` block on the Home page directly below the existing hero. Style: monochrome green + Liquid Glass (`backdrop-blur-xl`, `border-primary/20`, `bg-black/40`), no new colors.

### B1. `HeroPoster.tsx`
- Full-width section with layered glass card.
- Left: oversized headline using `LetterReveal` — "Build systems that ship." Sub: one-line value prop pulled from `developer.ts`.
- Right: animated 3D wireframe DM monogram (reuses Scene3D primitives) with parallax on mouse-move.
- Two CTAs: `View Work` → /portfolio, `Hire Me` → /contact (MagneticButton).
- Conversion hooks: trust line ("Available · responds in 24h"), arrow scroll cue.

### B2. `FeatureComparison.tsx`
- Three-column glass table: **Typical Dev** / **Senior Dev** / **David More**.
- Rows: Stack depth, Security mindset, Delivery speed, Communication, Post-launch support.
- Cells use check/dash glyphs in green; David column has a glowing `ring-primary/60` highlight and a "Recommended" badge.
- Mobile: table collapses to a stacked accordion (one card per persona), David's card open by default.
- Reveal on scroll with staggered row fade-in.

### B3. `TestimonialQuoteCard.tsx`
- Single large pull-quote card from highest-impact testimonial in `data/testimonials.ts`.
- Layout: oversized green quote glyph, italic quote text using `TypingEffect` (one-shot), avatar + name + role + company, 5-star rating in green.
- Subtle glass card with animated green gradient border (conic-gradient rotation, 8s).
- Below: small "Read more testimonials →" link to a (existing or new) testimonials list.

### B4. Composition
- `MarketingShowcase` stacks the three with `SectionDivider`s between them and respects the existing page rhythm.
- Add 3D parallax depth between sections (each section moves at slightly different scroll speed via `useScroll`).

---

## Files

**New**
- `src/components/effects/Scene3D.tsx`
- `src/components/effects/Tilt3DCard.tsx`
- `src/components/effects/Tilt3DCard.test.tsx`
- `src/components/effects/Scene3D.test.tsx`
- `src/components/marketing/HeroPoster.tsx`
- `src/components/marketing/FeatureComparison.tsx`
- `src/components/marketing/TestimonialQuoteCard.tsx`
- `src/components/marketing/MarketingShowcase.tsx`

**Updated**
- `package.json` (+ three, @react-three/fiber@^8.18, @react-three/drei@^9.122)
- `src/components/layout/Layout.tsx`, `Header.tsx`, `Footer.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/portfolio/ProjectCard.tsx`, `MasonryCard.tsx`
- `src/components/skills/SkillCategory.tsx`
- `src/components/testimonials/TestimonialCard.tsx`
- `src/components/effects/CommandTerminal.tsx`
- `src/pages/Home.tsx`, `Portfolio.tsx`, `About.tsx`, `Skills.tsx`, `Blog.tsx`, `BlogPost.tsx`, `Contact.tsx`, `Resume.tsx`, `ProjectDetail.tsx`, `Accessibility.tsx`, `NotFound.tsx`
- `src/index.css` (safe-area insets, overflow-x-clip)

---

## Risks & mitigations
- **3D perf on low-end mobile**: Scene3D auto-disables on `pointer: coarse` with viewport `<768px` AND on devices reporting `<4` `hardwareConcurrency`. Falls back to existing `NetworkGrid`.
- **Bundle size**: Three.js adds ~150KB gzipped. Lazy-load Scene3D via `React.lazy` so initial paint isn't blocked.
- **Tilt + custom cursor interaction**: ensure tilt cards mark themselves `data-cursor="pointer"` so the existing CustomCursor morphs correctly.
- **Reduced motion**: every new effect short-circuits when the user prefers reduced motion.