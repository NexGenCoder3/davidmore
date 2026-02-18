import { motion } from 'framer-motion';
import type { Testimonial } from '@/types';
import { useState, useEffect } from 'react';

interface Props {
  testimonial: Testimonial;
  delay: number;
}

export function TestimonialCard({ testimonial, delay }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(testimonial.quote.slice(0, i));
      if (i >= testimonial.quote.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [started, testimonial.quote]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="font-mono border border-hacker-green/20 rounded-lg p-5 bg-terminal-bg"
    >
      <div className="text-hacker-green/40 text-xs mb-2">
        ┌── incoming_message ──┐
      </div>
      <p className="text-hacker-green/80 text-sm min-h-[60px]">
        "{displayedText}"
        {displayedText.length < testimonial.quote.length && (
          <span className="animate-pulse text-hacker-green">█</span>
        )}
      </p>
      <div className="mt-3 text-xs text-hacker-green/50">
        <span className="text-hacker-green/70">{testimonial.name}</span> • {testimonial.role}
        <span className="text-hacker-green/30"> ({testimonial.relationship})</span>
      </div>
    </motion.div>
  );
}
