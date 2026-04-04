

# Fix Responsive Issues, Card Animations, and Typing Effects Across All Pages

## Issues Identified

### 1. Stiff Cards on Home Page
The MasonryCard and HorizontalShowcase cards lack dynamic hover/interaction animations. MasonryCard only has CSS `group-hover:scale-105` on the image - no card-level motion. Cards feel static.

### 2. Missing Typing Effect on Pages
TypingEffect is used on Contact, About, and Portfolio headings, but **missing from**: Skills, Blog, Resume pages. User wants all pages except Home to have the terminal typing heading.

### 3. Responsive Issues Across Pages

**Home:**
- Hero terminal text (`text-4xl md:text-6xl lg:text-7xl`) can overflow on small screens
- HorizontalShowcase cards at `w-[85vw]` on mobile work but progress dots are tiny
- Testimonials grid forces 2 cols at md but cards can be cramped

**Contact:**
- Grid goes 2-col at `md` (768px) which can feel tight at 768-900px range
- Terminal form `max-h-[500px]` may clip on shorter mobile screens
- Glass cards stack fine but lack breathing room on mobile

**About:**
- Portrait video aspect-ratio `3/4` is very tall on mobile, pushing biography far down
- Social links row could be better centered on mobile

**Skills:**
- The ASCII art decorators and separator line `═══════...` overflow on narrow screens
- No horizontal scroll protection

**Blog:**
- Search input and category filters wrap awkwardly on small screens
- No typing heading

**Resume:**
- Experience section `flex justify-between` causes role/period to overlap on mobile
- Long separator line overflows

**Footer:**
- Terminal status bar items wrap but lack proper mobile spacing

## Plan

### Step 1: Add Card Hover Animations on Home
- **MasonryCard.tsx**: Wrap the card `<Link>` in a `motion.div` with `whileHover={{ y: -8, transition: { duration: 0.3 } }}` for a lift effect
- **HorizontalShowcase.tsx**: Add `whileHover` scale/lift to each project panel

### Step 2: Add TypingEffect to Missing Pages
- **Skills.tsx**: Replace the static `SKILL_MATRIX` h1 with `<TypingEffect text="SKILL_MATRIX" />`
- **Blog.tsx**: Replace static `WRITE_UPS` h1 with `<TypingEffect text="WRITE_UPS" />`
- **Resume.tsx**: Replace static heading with `<TypingEffect text="RESUME" />`

### Step 3: Fix Responsive - Home
- Reduce hero heading to `text-3xl md:text-5xl lg:text-7xl` to prevent overflow on small phones
- Add `text-base md:text-lg` for mission text
- Testimonials: change to single column on mobile with `grid-cols-1 md:grid-cols-2`

### Step 4: Fix Responsive - Contact
- Change grid breakpoint from `md:grid-cols-2` to `lg:grid-cols-2` so it stays stacked until 1024px
- Reduce terminal form `max-h` or remove it on mobile

### Step 5: Fix Responsive - About
- Reduce portrait aspect ratio on mobile: `aspect-[4/5] md:aspect-[3/4]`
- Center social links on mobile

### Step 6: Fix Responsive - Skills
- Truncate or wrap the ASCII separator with `overflow-hidden` and `max-w-full`
- Add `break-all` or responsive text sizing to ASCII art

### Step 7: Fix Responsive - Blog
- Make category filter buttons scrollable horizontally on mobile with `overflow-x-auto flex-nowrap`
- Ensure search input is full-width on mobile

### Step 8: Fix Responsive - Resume
- Stack role/period vertically on mobile: `flex-col sm:flex-row`
- Add `overflow-hidden` to separator lines

### Step 9: Fix Responsive - Footer
- Improve terminal status bar mobile layout with smaller gaps and wrapping

## Files to Update

| File | Changes |
|------|---------|
| `src/components/portfolio/MasonryCard.tsx` | Add hover lift animation |
| `src/components/portfolio/HorizontalShowcase.tsx` | Add hover animation to panels |
| `src/pages/Skills.tsx` | Add TypingEffect, fix ASCII overflow |
| `src/pages/Blog.tsx` | Add TypingEffect, fix filter layout |
| `src/pages/Resume.tsx` | Add TypingEffect, fix mobile layout |
| `src/pages/Home.tsx` | Fix hero text sizes, testimonial grid |
| `src/pages/Contact.tsx` | Fix grid breakpoint, terminal height |
| `src/pages/About.tsx` | Fix portrait ratio, social links |
| `src/components/layout/Footer.tsx` | Fix mobile status bar |

