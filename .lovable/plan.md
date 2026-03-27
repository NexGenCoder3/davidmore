

# Fix ScrollToTop Error + Add Magnetic Nav Links

## 1. Fix: ScrollToTop ReferenceError (blank screen)

The source code is correct — `ScrollToTop` exists at `src/components/utils/ScrollToTop.tsx` and is properly imported. The error points to "line 341" in a 176-line file, indicating a stale Vite cache. 

**Fix:** Touch `App.tsx` with a trivial change (add a comment or re-save) to force Vite to re-transpile. If that doesn't work, the component file may need to be recreated with identical content.

**Action:** Re-save `src/components/utils/ScrollToTop.tsx` and `src/App.tsx` (no actual code changes needed — just trigger rebuild).

---

## 2. Feature: Magnetic Cursor on Nav Links & CTAs

The `MagneticButton` component already exists at `src/components/effects/MagneticButton.tsx`. It's already used in `Home.tsx`. Now wrap nav links and CTA buttons with it.

**Update `src/components/layout/Header.tsx`:**
- Import `MagneticButton`
- Wrap each desktop nav `<Link>` inside `<MagneticButton strength={0.2}>`
- Wrap the `ThemeToggle` button in `<MagneticButton>`

**Update `src/components/layout/Footer.tsx`** (if it has social icons/links):
- Wrap social icon links in `<MagneticButton strength={0.25}>`

**Files:**
- Re-save `src/components/utils/ScrollToTop.tsx` (trigger rebuild)
- Update `src/components/layout/Header.tsx` (add MagneticButton wrapping)
- Check/update `src/components/layout/Footer.tsx` for social links

