

# Add Navigation Buttons to Featured Projects Horizontal Showcase

## What's Changing

The HorizontalShowcase currently relies on swipe/drag to navigate. We'll add fancy prev/next arrow buttons so users can click to scroll between cards, plus replace the basic dot indicators with an active-state progress bar.

## Plan

### 1. Add Prev/Next Navigation Buttons to HorizontalShowcase
- Add `scrollToNext` and `scrollToPrev` functions that programmatically scroll the container by one card width
- Track which card index is active based on scroll position
- Render two glowing, glassmorphic arrow buttons (ChevronLeft / ChevronRight from lucide) positioned on the left and right edges of the carousel
- Style them with the hacker-green glow aesthetic: `bg-black/60 backdrop-blur border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]` with hover glow intensification
- Hide prev button when at start, hide next button when at end
- On mobile, make buttons smaller and semi-transparent; on desktop, full size

### 2. Upgrade Progress Indicator
- Replace the small dots with a segmented progress bar or clickable dot row that highlights the active card
- Each dot becomes clickable to jump to that card

### 3. Ensure Card Hover Animations Work
- The existing `whileHover={{ y: -6, scale: 1.02 }}` on cards is already in place — no changes needed there

## Files to Update

| File | Changes |
|------|---------|
| `src/components/portfolio/HorizontalShowcase.tsx` | Add prev/next buttons, active card tracking, clickable dots |

