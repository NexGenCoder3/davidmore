## About Page Refresh — Cinematic Glass Style

The `/about` route already exists (`src/pages/About.tsx`) and is wired in `App.tsx`, but it currently uses a flat editorial layout (plain image + text columns, `bg-muted`, basic separators). It doesn't match the cinematic glass + monochrome-green hacker aesthetic used on Home (HeroPoster, FeatureComparison, TestimonialQuoteCard, GlassCard, TiltCard, Scene3D backdrop).

This plan rebuilds `/about` as a true cinematic page with a clear value proposition.

### Goals
- Match site's visual language: glass surfaces, green accents, terminal/mono touches, motion reveals.
- Lead with a sharp **value proposition** above the fold (who David is, what he builds, the outcome for clients).
- Keep performance-safe (reuse existing effects; no new heavy 3D).

### Page structure

1. **Hero / Value Prop Section**
   - `TypingEffect` headline: "Building cinematic, production-grade web experiences."
   - Sub-line value prop (1–2 sentences) pulled/refined from `developerInfo.heroIntroduction`.
   - Terminal-style status chip: `~/about $ whoami` → "david.more — software engineer"
   - `FadeUp` reveals; respects reduced motion.

2. **Portrait + Identity Card** (glass)
   - `GlassCard` + `TiltCard` wrapping the portrait (`developerInfo.portraitImage`).
   - Beside it: name, tagline, location, availability, email, GitHub — all inside a sibling glass card with mono labels (`location:`, `email:`, `status:`).

3. **What I Do — 3 Value Pillars** (glass grid)
   - Three `GlassCard`s in a responsive grid (1 / 2 / 3 cols):
     - **Front-End Engineering** — React, TypeScript, Vite, Tailwind.
     - **Cinematic UI** — motion, glass, 3D, micro-interactions.
     - **Ship-Ready Quality** — accessibility, performance, SEO.
   - Each card: icon (lucide), short title, 1-sentence outcome-focused copy.
   - `StaggerGroup` for entrance.

4. **Approach / Philosophy** (split)
   - Left: heading "How I work".
   - Right: paragraphs from `developerInfo.approach`.
   - Subtle glass panel background.

5. **Bio / Background** (glass)
   - `developerInfo.biography` paragraphs inside a single wide glass card.
   - Education + location chips at the bottom.

6. **CTA Footer Section**
   - Glass band with two buttons: "View Portfolio" (`/portfolio`) + "Start a Project" (`/contact`).
   - Uses existing `Button` variants (`default`, `outline`).

### Technical details
- File to rewrite: `src/pages/About.tsx`.
- Reuse: `GlassCard`, `TiltCard`, `FadeUp`, `StaggerGroup`, `TypingEffect`, `SEOHead`, `Button`, lucide icons.
- No new dependencies. No changes to `Layout` (Scene3D already mounted globally).
- Semantic tokens only (no hard-coded colors); green accent via existing `hacker-green` / `primary` tokens.
- Single `<h1>` in hero; `<h2>` for each section. Alt text on portrait.
- `SEOHead` already configured for About — keep, just refine description to highlight value prop.
- Container: `max-w-6xl mx-auto px-4 md:px-6 lg:px-8`; tighten vertical spacing (`py-16 md:py-20`) to match standardized spacing rule.
- Responsive: stack on mobile, 2-col tablet where natural, full layout desktop. Mobile-first padding/typography scales.

### Out of scope
- No backend, no new data sources, no route changes.
- No edits to Home, Layout, or shared components.
