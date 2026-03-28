import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useMemo } from 'react';
import { usePageTransition } from '@/hooks/usePageTransition';

interface PageTransitionProps {
  children: ReactNode;
}

const SLAT_COUNT = 5;
const TOTAL_DURATION = 0.7;
const SLAT_STAGGER = 0.04;

/**
 * Premium cinematic page transition
 * Multi-layer: diagonal slats, scanlines, grain, terminal text, chromatic aberration, cursor blink
 */
export function PageTransition({ children }: PageTransitionProps) {
  const { direction, slatConfigs, terminalText, prefersReducedMotion } = usePageTransition();

  const isForward = direction === 'forward';

  // Reduced motion: simple fade
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <>
      {/* === OVERLAY LAYERS (fixed, pointer-events-none) === */}

      {/* Layer 1: 5 Diagonal Slats */}
      {slatConfigs.map((config, i) => {
        const baseDelay = i * SLAT_STAGGER + config.delayJitter;
        const slatHeight = `${100 / SLAT_COUNT}vh`;
        const originX = isForward ? 'left' : 'right';
        const transformOrigin = isForward ? '0% 50%' : '100% 50%';

        return (
          <motion.div
            key={`slat-${i}`}
            className="fixed z-[100] pointer-events-none"
            style={{
              top: `${(i * 100) / SLAT_COUNT}vh`,
              left: '-5vw',
              width: '110vw',
              height: slatHeight,
              transformOrigin,
              transform: `skewX(-12deg) translateY(${config.offsetY}px) rotate(${config.rotationJitter}deg)`,
              backgroundColor: 'hsl(var(--primary))',
            }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              delay: baseDelay,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        );
      })}

      {/* Layer 2: Dark underlay (behind slats, revealed as slats retract) */}
      <motion.div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--terminal-bg))' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: SLAT_COUNT * SLAT_STAGGER + 0.1 }}
      />

      {/* Layer 3: CRT Scanlines flash */}
      <motion.div
        className="fixed inset-0 z-[101] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.04) 2px,
            rgba(0, 255, 65, 0.04) 4px
          )`,
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.6 }}
        transition={{ duration: 0.12, delay: 0.15 }}
      />

      {/* Layer 4: Film grain */}
      <motion.div
        className="fixed inset-0 z-[101] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      />

      {/* Layer 5: Chromatic aberration edges */}
      <motion.div
        className="fixed inset-0 z-[102] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.12, delay: 0.2 }}
      >
        {/* Red channel offset */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 2px 0 0 rgba(255, 0, 0, 0.15), inset -2px 0 0 rgba(0, 100, 255, 0.15)',
          }}
        />
      </motion.div>

      {/* Layer 6: Terminal text flash */}
      <motion.div
        className="fixed inset-0 z-[103] pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          times: [0, 0.2, 0.7, 1],
          delay: 0.05,
        }}
      >
        <span
          className="font-mono text-sm md:text-base tracking-widest"
          style={{ color: 'hsl(var(--hacker-green-glow))' }}
        >
          {terminalText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            _
          </motion.span>
        </span>
      </motion.div>

      {/* Layer 7: Final cursor blink — the signature move */}
      <motion.div
        className="fixed inset-0 z-[104] pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 1, 0],
        }}
        transition={{
          duration: 0.3,
          times: [0, 0.6, 0.8, 1],
          delay: TOTAL_DURATION - 0.2,
        }}
      >
        <span
          className="font-mono text-lg"
          style={{ color: 'hsl(var(--hacker-green-glow))' }}
        >
          {'> '}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.15 }}
          >
            █
          </motion.span>
        </span>
      </motion.div>

      {/* === PAGE CONTENT === */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
          filter: 'blur(4px) brightness(1.15)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
          filter: 'blur(6px) brightness(0.9)',
        }}
        transition={{
          duration: 0.4,
          delay: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
