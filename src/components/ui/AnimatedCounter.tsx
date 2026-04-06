import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = '', label, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
        {count}{suffix}
      </span>
      <span className="text-xs md:text-sm font-mono text-muted-foreground tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  );
}
