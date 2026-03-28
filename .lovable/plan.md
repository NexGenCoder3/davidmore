

# Comprehensive Bug Fixes + Enhancements

## Issues to Fix (7 items)

---

### 1. NetworkGrid Renders ON TOP of Content in Light Mode
The canvas has `fixed inset-0 z-0` but creates a stacking context issue. In light mode, the green dots/lines are visible over text.

**Fix in `src/components/effects/NetworkGrid.tsx`:**
- Change `z-0` to `z-[-1]` (or use CSS `z-index: -1`) so it's always behind content
- Reduce dot/line opacity further in light mode by reading the current theme and adjusting

---

### 2. Theme Toggle & Text Invisible in Light Mode
The `ThemeToggle` button uses `variant="ghost"` with no explicit color override for the transparent header state. On the home hero (`bg-black/90`), in light mode the icon inherits dark foreground colors and disappears against the dark hero.

**Fix in `src/components/layout/Header.tsx`:**
- Add `isTransparent` styling to the ThemeToggle: when transparent, force `text-white` on the toggle button
- Also ensure the mobile menu button in light mode gets `text-white` on transparent state (already partially done but verify)

**Fix in `src/components/layout/ThemeToggle.tsx`:**
- Accept an optional `className` prop and pass it through so Header can override colors

---

### 3. HorizontalShowcase Cards Can't Scroll Right
The `overflow-x-auto` container relies on native scroll, but the user can't drag/swipe it. The cards are stuck.

**Fix in `src/components/portfolio/HorizontalShowcase.tsx`:**
- Add mouse drag-to-scroll behavior: `onMouseDown`, `onMouseMove`, `onMouseUp` handlers that translate mouse drag into `scrollLeft` changes
- This makes the carousel draggable on desktop, not just touch-swipeable

---

### 4. Contact Form Doesn't Actually Send Messages
`VITE_FORMSPREE_ID` is not set in project secrets. The form throws "Form not configured" silently.

**Fix:**
- Need to set `VITE_FORMSPREE_ID` as a project secret (will ask user for their Formspree form ID)
- OR switch to Lovable's built-in transactional email system so messages go to their Gmail

**Action:** Ask the user if they have a Formspree account/form ID, or if they want to set up Lovable's built-in email sending instead.

---

### 5. Remove "DEMO MODE" Banner from Admin Dashboard
The warning banner is unprofessional for a production portfolio.

**Fix in `src/pages/Admin.tsx`:**
- Remove the yellow `⚠ DEMO MODE` banner entirely (lines 32-37)
- Replace with a cleaner, subtle "Analytics" label without demo language

---

### 6. Typing Animation on Page Titles
Add terminal-style typing effect to page headings across About, Contact, Skills, Blog, Portfolio pages.

**Approach:** The `TypingEffect` component already exists at `src/components/effects/TypingEffect.tsx`. Use it in page hero `<h1>` elements.

**Update pages:** About, Contact, Skills, Blog, Portfolio — replace static `<h1>` text with `<TypingEffect text="Page Title" speed={40} />` wrapped in appropriate sizing classes.

---

### 7. Page Transition Still Feels Static / One-Directional
The slats only animate from one side. The transition layers are `z-[100+]` which is correct but the exit animation may not trigger properly because pages aren't wrapped in `AnimatePresence` with `mode="wait"`.

**Fix in `src/components/ui/PageTransition.tsx`:**
- Make slat `initial` state use `scaleX: 0` and animate to `1` then back to `0` (enter → cover → reveal pattern) instead of current `initial: 1, animate: 0` which only does the reveal half
- Add the sweep direction: `isForward` should change `transformOrigin` so slats visually sweep in different directions

---

## Files Summary

| Action | File |
|--------|------|
| Update | `src/components/effects/NetworkGrid.tsx` (z-index fix + light mode opacity) |
| Update | `src/components/layout/Header.tsx` (theme toggle color in transparent state) |
| Update | `src/components/layout/ThemeToggle.tsx` (accept className prop) |
| Update | `src/components/portfolio/HorizontalShowcase.tsx` (drag-to-scroll) |
| Update | `src/pages/Admin.tsx` (remove demo banner) |
| Update | `src/pages/About.tsx` (typing animation on title) |
| Update | `src/pages/Contact.tsx` (typing animation on title) |
| Update | `src/pages/Portfolio.tsx` (typing animation on title) |
| Update | `src/components/ui/PageTransition.tsx` (improve slat animation) |

**Question needed:** For the contact form, do you have a Formspree form ID to configure,

<lov-plan>

# Comprehensive Bug Fixes + Enhancements

## Issues to Fix (7 items)

---

### 1. NetworkGrid Renders ON TOP of Content in Light Mode
The canvas has `fixed inset-0 z-0` but creates a stacking context issue — green dots/lines visible over text in light mode.

**Fix `src/components/effects/NetworkGrid.tsx`:** Change class to `z-[-1]` so it's always behind all content.

---

### 2. Theme Toggle & Text Invisible in Light Mode
`ThemeToggle` uses `variant="ghost"` with no color override for the transparent header state. On the home hero (`bg-black/90`), light mode icons inherit dark foreground and disappear.

**Fix `src/components/layout/ThemeToggle.tsx`:** Accept optional `className` prop, pass through to Button.

**Fix `src/components/layout/Header.tsx`:** Pass `className="text-white hover:bg-white/10"` to ThemeToggle when `isTransparent`.

---

### 3. HorizontalShowcase Cards Can't Scroll Right
`overflow-x-auto` relies on native scroll only — no drag support on desktop.

**Fix `src/components/portfolio/HorizontalShowcase.tsx`:** Add mouse drag-to-scroll via `onMouseDown/Move/Up/Leave` handlers that translate mouse drag into `scrollLeft` changes. Keeps touch swipe working natively.

---

### 4. Contact Form Doesn't Actually Send
`VITE_FORMSPREE_ID` is not set in project secrets. Form silently fails.

**Need from you:** Your Formspree form ID (looks like `xyzabcde` from formspree.io). I'll add it as a project secret. OR I can set up Lovable's built-in email system so messages go directly to your Gmail — no third-party account needed.

---

### 5. Remove "DEMO MODE" Banner
The yellow `⚠ DEMO MODE` warning on Admin page is unprofessional for a production site.

**Fix `src/pages/Admin.tsx`:** Remove the demo banner entirely (lines 32-37).

---

### 6. Typing Animation on Page Titles
`TypingEffect` component already exists. Wire it into page hero `<h1>` elements.

**Update:** About, Contact, Skills, Blog, Portfolio pages — replace static heading text with `<TypingEffect text="Title" speed={40} />`.

---

### 7. Page Transition Feels Static / One-Sided
Slats only do the "reveal" half (scaleX 1→0). Need full cover→reveal cycle and direction-aware sweep.

**Fix `src/components/ui/PageTransition.tsx`:** Animate slats as `scaleX: [0, 1, 1, 0]` with timed keyframes so they sweep in, hold, then sweep out. Use `isForward` to flip `transformOrigin` between entry and exit phases.

---

## Files Summary

| Action | File |
|--------|------|
| Update | `src/components/effects/NetworkGrid.tsx` |
| Update | `src/components/layout/ThemeToggle.tsx` |
| Update | `src/components/layout/Header.tsx` |
| Update | `src/components/portfolio/HorizontalShowcase.tsx` |
| Update | `src/pages/Admin.tsx` |
| Update | `src/pages/About.tsx`, `Contact.tsx`, `Portfolio.tsx`, `Skills.tsx`, `Blog.tsx` |
| Update | `src/components/ui/PageTransition.tsx` |

