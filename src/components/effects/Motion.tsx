import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

type FadeUpProps = HTMLMotionProps<'div'> & { delay?: number; children: ReactNode };

/** Simple in-view fade-up reveal. Respects prefers-reduced-motion via framer-motion defaults. */
export function FadeUp({ children, delay = 0, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for child reveals. */
export function StaggerGroup({ children, delay = 0, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
