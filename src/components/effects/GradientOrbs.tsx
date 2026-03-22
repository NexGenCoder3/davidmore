import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const orbs = [
  { size: 400, color: 'rgba(34,197,94,0.08)', x: '10%', y: '20%', duration: 25 },
  { size: 300, color: 'rgba(16,185,129,0.06)', x: '70%', y: '60%', duration: 30 },
  { size: 350, color: 'rgba(34,197,94,0.05)', x: '40%', y: '80%', duration: 35 },
  { size: 250, color: 'rgba(20,184,166,0.07)', x: '80%', y: '10%', duration: 20 },
];

/**
 * Floating gradient orbs that drift slowly behind content,
 * providing depth for glass card blur effects.
 * Only renders on desktop for performance.
 */
export function GradientOrbs() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -60, 40, -80, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
