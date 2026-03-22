import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition with green wipe reveal animation
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Green wipe overlay */}
      <motion.div
        className="fixed inset-0 z-[100] bg-primary origin-left pointer-events-none"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'right' }}
      />
      <motion.div
        className="fixed inset-0 z-[99] bg-terminal-bg origin-left pointer-events-none"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={{ transformOrigin: 'right' }}
      />
      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
