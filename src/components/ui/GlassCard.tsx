import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  as?: 'div' | 'section' | 'article';
}

export function GlassCard({ children, className, hoverEffect = true, as = 'div' }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'bg-white/[0.03] dark:bg-white/[0.03]',
        'backdrop-blur-xl backdrop-saturate-150',
        'border border-white/[0.08]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]',
        'transition-shadow duration-500',
        hoverEffect && 'hover:shadow-[0_16px_48px_rgba(34,197,94,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/[0.15]',
        className
      )}
      style={hoverEffect ? {
        background: `
          radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34,197,94,${isHovered ? 0.08 : 0}) 0%, transparent 40%),
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,${isHovered ? 0.08 : 0.03}) 0%, transparent 50%),
          rgba(255,255,255,0.03)
        `,
      } : undefined}
    >
      {/* Specular highlight sweep */}
      {hoverEffect && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)`,
          }}
        />
      )}
      {children}
    </Component>
  );
}
