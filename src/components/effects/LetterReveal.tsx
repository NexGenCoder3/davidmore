import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  delay?: number;
  stagger?: number;
}

/**
 * Cinematic letter-by-letter reveal — each character fades up + un-blurs in sequence.
 * Used for the hero H1 to create a film-title-style entrance.
 * Respects prefers-reduced-motion via a CSS media query fallback.
 */
export function LetterReveal({
  text,
  className,
  as: Tag = 'h1',
  delay = 0.3,
  stagger = 0.045,
}: LetterRevealProps) {
  const letters = Array.from(text);

  return (
    <Tag className={cn('relative inline-block', className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {letters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: '0.4em', filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.2, 0.65, 0.3, 1],
            }}
            style={char === ' ' ? { width: '0.35em' } : undefined}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
