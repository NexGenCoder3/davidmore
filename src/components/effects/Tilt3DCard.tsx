import { ReactNode, useRef, useState, useEffect, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}

/**
 * Perspective tilt-on-hover wrapper. No-op on touch / reduced motion.
 */
export function Tilt3DCard({ children, className, max = 8, style }: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!isTouch && !reduced);
  }, []);

  if (!enabled) {
    return (
      <div className={cn('transition-transform', className)} style={style}>
        {children}
      </div>
    );
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -py * max;
    const ry = px * max;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`);
  };

  const reset = () => setTransform('');

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="pointer"
      className={cn('transition-transform duration-200 will-change-transform', className)}
      style={{ transform, transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}
