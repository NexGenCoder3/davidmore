import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  glitchIntensity?: 'low' | 'medium' | 'high';
}

/**
 * Glitch text effect with chromatic aberration and distortion
 * Creates an authentic hacker/cyberpunk aesthetic
 */
export function GlitchText({ 
  text, 
  className = '',
  as: Tag = 'span',
  glitchIntensity = 'medium'
}: GlitchTextProps) {
  const intensityConfig = {
    low: { clipDuration: 4, offsetRange: 2 },
    medium: { clipDuration: 2, offsetRange: 4 },
    high: { clipDuration: 1, offsetRange: 6 }
  };

  const config = intensityConfig[glitchIntensity];

  return (
    <span className={cn('relative inline-block', className)}>
      {/* Main text */}
      <Tag className="relative z-10 glitch-text" data-text={text}>
        {text}
      </Tag>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-[#0ff] opacity-80 z-0"
        aria-hidden="true"
        animate={{
          x: [-config.offsetRange, config.offsetRange, -config.offsetRange],
          opacity: [0.8, 0.4, 0.8],
        }}
        transition={{
          duration: config.clipDuration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
      >
        <Tag>{text}</Tag>
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-[#f0f] opacity-80 z-0"
        aria-hidden="true"
        animate={{
          x: [config.offsetRange, -config.offsetRange, config.offsetRange],
          opacity: [0.8, 0.4, 0.8],
        }}
        transition={{
          duration: config.clipDuration * 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
      >
        <Tag>{text}</Tag>
      </motion.span>

      <style>{`
        .glitch-text {
          animation: glitch-skew ${config.clipDuration * 2}s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(2deg); }
          20% { transform: skew(-1deg); }
          30% { transform: skew(0deg); }
          40% { transform: skew(1deg); }
          50% { transform: skew(-2deg); }
          60% { transform: skew(0deg); }
          70% { transform: skew(-1deg); }
          80% { transform: skew(2deg); }
          90% { transform: skew(0deg); }
          100% { transform: skew(-1deg); }
        }
      `}</style>
    </span>
  );
}

/**
 * Flickering text effect for terminal-style displays
 */
export function FlickerText({ 
  text, 
  className = '' 
}: { 
  text: string; 
  className?: string; 
}) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      animate={{
        opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
        textShadow: [
          '0 0 10px currentColor',
          '0 0 20px currentColor',
          '0 0 10px currentColor',
          '0 0 15px currentColor',
          '0 0 10px currentColor',
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
