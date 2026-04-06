

# Elevate to Production-Grade Creative Portfolio

This is a real company/final year project -- every detail matters. Here's a comprehensive plan to bring it to the level of top western creative agency portfolios (like Linear, Vercel, Stripe, Awwwards winners) while keeping the hacker/terminal identity.

## Bug Fix: Terminal Close Button

The terminal toggle button (line 266-272 in CommandTerminal.tsx) only opens the terminal -- tapping it again does nothing. Fix: change `onClick={() => setIsOpen(true)}` to `onClick={() => setIsOpen(prev => !prev)}` so tapping the terminal icon toggles it open/closed on all screen sizes.

## Creative Enhancements

### 1. Smooth Scroll-Triggered Reveal Animations (All Pages)
Currently content just fades in minimally. Upgrade to staggered, scroll-triggered animations:
- **Home sections**: Each section's heading, text, and CTAs animate in sequentially with stagger (0.1s between children) using `framer-motion`'s `staggerChildren`
- **Project cards**: Stagger-in from bottom with `y: 40 -> 0` as they enter viewport
- **Contact info cards**: Cascade in one by one

### 2. Interactive Cursor Glow on Cards (Desktop)
Add a radial gradient glow that follows the mouse cursor on project cards and glass cards -- like the Stripe/Linear card effect. The GlassCard already tracks mouse position but the effect is too subtle. Intensify it:
- Make the specular highlight actually visible (`opacity-0 group-hover:opacity-100` needs the parent to have `group` class)
- Add a green-tinted radial glow: `radial-gradient(600px at ${x}px ${y}px, rgba(34,197,94,0.06), transparent 40%)`

### 3. Hero Section -- Animated Counter Stats Bar
Add a floating stats bar below the hero terminal showing animated counters:
- `8+ Projects` | `4+ Years` | `100% Passion` -- numbers count up when scrolled into view
- Styled as a glassmorphic pill bar with terminal mono font

### 4. Smooth Page Section Transitions
Add subtle dividers between Home page sections using animated SVG waves or gradient fades instead of plain `border-t border-border`. A thin animated gradient line that pulses with the hacker-green color.

### 5. "Available for Hire" Floating Badge
The StatusWidget is hidden on mobile (`hidden lg:block`). Create a smaller, always-visible version -- a pulsing green dot with "Available" text in the header on mobile, showing availability status.

### 6. Project Cards -- Tilt Effect (3D)
Add a subtle 3D tilt effect to MasonryCard on hover using CSS `perspective` and `rotateX/rotateY` based on mouse position. This is the signature effect of modern portfolio sites (seen on Awwwards winners).

### 7. Testimonials -- Auto-Scrolling Marquee
Replace the static grid with a horizontal auto-scrolling marquee (infinite scroll) for testimonials. Two rows scrolling in opposite directions. Much more dynamic and modern.

### 8. Mobile Navigation Upgrade
The Sheet mobile menu is functional but plain. Enhance it:
- Add staggered link animations (each link slides in from right with 50ms delay)
- Add the terminal-style `>_` prefix before each nav link
- Show current route with a green accent dot

### 9. Footer -- Interactive Terminal Line
Make the footer terminal status bar interactive -- clicking on the directory path copies it, and the uptime counter has a tooltip showing "Session uptime".

### 10. Contact Page -- Animated Background
Add a subtle NetworkGrid or particle effect behind the Contact page (currently plain background). Gives it depth and matches the hacker theme.

## Files to Update

| File | Changes |
|------|---------|
| `CommandTerminal.tsx` | Fix toggle button to open AND close |
| `MasonryCard.tsx` | Add 3D tilt effect on hover |
| `GlassCard.tsx` | Fix and intensify cursor-tracking glow |
| `Home.tsx` | Add stats counter bar, animated section dividers, marquee testimonials |
| `HorizontalShowcase.tsx` | Enhance card interactions |
| `Header.tsx` | Add availability badge on mobile, enhance mobile menu |
| `TestimonialCard.tsx` | Refactor for marquee layout |
| `Contact.tsx` | Add background particle effect |
| `Footer.tsx` | Make status bar interactive |
| `Layout.tsx` | Show NetworkGrid on all pages (not just inner) |

## New Components

| Component | Purpose |
|-----------|---------|
| `AnimatedCounter.tsx` | Count-up number animation for stats |
| `TestimonialMarquee.tsx` | Infinite horizontal scroll testimonials |
| `TiltCard.tsx` | Reusable 3D tilt wrapper |
| `SectionDivider.tsx` | Animated gradient line between sections |

## Technical Notes
- All animations use `framer-motion` (already installed) and CSS transforms -- no heavy 3D libraries
- Tilt effect uses pure CSS `transform: perspective(1000px) rotateX() rotateY()` driven by mouse events
- Marquee uses CSS `@keyframes` with `translateX` for performance (no JS animation loop)
- Counter uses `useInView` from framer-motion + `requestAnimationFrame` for smooth counting
- All effects are disabled/reduced on mobile for performance (`prefers-reduced-motion` respected)

