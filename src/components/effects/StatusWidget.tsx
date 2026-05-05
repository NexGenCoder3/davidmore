import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorPreference } from '@/hooks/useCursorPreference';

const statusMessages = [
  { text: 'Compiling portfolio... ██████ 100%', icon: '⚡' },
  { text: 'Status: Available for hire', icon: '🟢' },
  { text: 'Coffee level: ████░░ 67%', icon: '☕' },
  { text: 'All systems operational', icon: '✓' },
  { text: 'Threat level: None detected', icon: '🛡️' },
  { text: 'Packets encrypted: 100%', icon: '🔒' },
];

/**
 * Small floating status widget showing rotating terminal-style status messages
 * Glass-morphic pill positioned in the bottom-left corner
 */
export function StatusWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % statusMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const message = statusMessages[currentIndex];
  const { pref, toggle } = useCursorPreference();

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden lg:flex flex-col gap-2 items-start">
      <div className="relative overflow-hidden rounded-full px-4 py-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 font-mono text-xs text-hacker-green/70"
          >
            <span>{message.icon}</span>
            <span>{message.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={`Toggle custom cursor (currently ${pref})`}
        className="rounded-full px-3 py-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] font-mono text-[10px] text-hacker-green/70 hover:text-hacker-green hover:border-primary/40 transition-colors"
      >
        cursor: [{pref === 'on' ? 'custom' : 'native'}]
      </button>
    </div>
  );
}
