import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  as?: 'div' | 'section' | 'article';
}

/**
 * Apple Liquid Glass UI card with frosted glass effect,
 * specular highlight on hover, and subtle border glow
 */
export function GlassCard({ children, className, hoverEffect = true, as = 'div' }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !hoverEffect) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-white/[0.03] dark:bg-white/[0.03]',
        'backdrop-blur-xl backdrop-saturate-150',
        'border border-white/[0.08]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]',
        'transition-shadow duration-500',
        hoverEffect && 'hover:shadow-[0_16px_48px_rgba(34,197,94,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]',
        className
      )}
      style={hoverEffect ? {
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.06) 0%, transparent 50%),
          rgba(255,255,255,0.03)
        `,
      } : undefined}
    >
      {/* Specular highlight sweep */}
      {hoverEffect && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
          }}
        />
      )}
      {children}
    </Component>
  );
}
