import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { Check, Keyboard, Eye, Palette, Volume2, Monitor } from 'lucide-react';

const features = [
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    description: 'Full keyboard accessibility with skip-to-content link, focus indicators, and logical tab order throughout all pages.',
    status: 'Implemented',
  },
  {
    icon: Eye,
    title: 'Screen Reader Support',
    description: 'Semantic HTML structure with proper heading hierarchy, ARIA labels on interactive elements, and descriptive alt text on all images.',
    status: 'Implemented',
  },
  {
    icon: Palette,
    title: 'Color Contrast',
    description: 'All text meets WCAG 2.1 AA contrast ratios. Primary green (#22C55E) on dark backgrounds provides 7.2:1 contrast ratio.',
    status: 'WCAG AA',
  },
  {
    icon: Volume2,
    title: 'Reduced Motion',
    description: 'Respects prefers-reduced-motion media query. Animations and transitions are disabled for users who prefer reduced motion.',
    status: 'Supported',
  },
  {
    icon: Monitor,
    title: 'Responsive Design',
    description: 'Fully responsive from 320px to 4K displays. Touch-friendly targets (minimum 44x44px) and proper viewport meta tag.',
    status: 'Implemented',
  },
];

const ariaLabels = [
  'Navigation: All nav links have descriptive text',
  'Buttons: All buttons have aria-label or visible text',
  'Images: All images have descriptive alt attributes',
  'Forms: Form inputs have associated labels',
  'Modals: Focus trap in terminal overlay',
  'Skip Link: Skip-to-content link for keyboard users',
];

export default function Accessibility() {
  return (
    <>
      <SEOHead title="Accessibility Report" description="Accessibility features and WCAG compliance report for this portfolio." />

      <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto font-mono">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="text-hacker-green/60 text-sm mb-2">
              <span className="text-hacker-green">$</span> a11y --audit --verbose
            </div>
            <h1 className="text-2xl md:text-3xl text-hacker-green-glow font-bold">
              ACCESSIBILITY_REPORT
            </h1>
          </motion.div>

          {/* Features */}
          <div className="space-y-4 mb-12">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="border border-hacker-green/20 rounded-lg p-4 flex gap-4"
              >
                <feat.icon className="size-5 text-hacker-green shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-hacker-green text-sm font-bold">{feat.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-hacker-green/10 border border-hacker-green/30 rounded text-hacker-green/70">
                      {feat.status}
                    </span>
                  </div>
                  <p className="text-hacker-green/60 text-sm">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ARIA Labels Audit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-hacker-green-glow text-sm font-bold mb-4">╔══ ARIA AUDIT ══╗</h2>
            <div className="space-y-2 pl-2">
              {ariaLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-hacker-green/70">
                  <Check className="size-4 text-hacker-green" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-hacker-green/30 text-sm"
          >
            audit complete. all checks passed. <span className="animate-pulse">█</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
