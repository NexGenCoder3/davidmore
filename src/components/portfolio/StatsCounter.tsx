import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Code2, Layers, Calendar } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, duration: 2 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

const stats: StatItem[] = [
  {
    icon: <Code2 className="w-5 h-5" />,
    target: 8,
    suffix: '+',
    label: 'Projects Built',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    target: 12,
    suffix: '+',
    label: 'Technologies',
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    target: 3,
    suffix: '+',
    label: 'Years Experience',
  },
];

export function StatsCounter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <GlassCard className="p-6 text-center" hoverEffect>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-primary/10 text-primary mb-3">
              {stat.icon}
            </div>
            <div className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-1">
              <AnimatedNumber target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="text-sm text-muted-foreground font-light tracking-wide">
              {stat.label}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
