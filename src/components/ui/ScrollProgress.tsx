import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin glowing green progress bar fixed at the top of the viewport
 * showing scroll position through the page
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(142 70% 45%), hsl(142 90% 55%))',
        boxShadow: '0 0 8px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)',
      }}
    />
  );
}
