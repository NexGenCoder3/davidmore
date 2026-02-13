import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: '[BIOS] Initializing system...', delay: 0 },
  { text: '[BIOS] Memory check: 16384 MB OK', delay: 300 },
  { text: '[KERNEL] Loading kernel modules...', delay: 600 },
  { text: '[KERNEL] Mounting filesystems... OK', delay: 900 },
  { text: '[NET] Establishing secure connection...', delay: 1200 },
  { text: '[NET] Firewall rules loaded: 47 active', delay: 1500 },
  { text: '[AUTH] Loading encryption keys... OK', delay: 1800 },
  { text: '[SYS] Starting services...', delay: 2100 },
  { text: '[SYS] david@more:~$ ./portfolio --launch', delay: 2400 },
  { text: '', delay: 2700 },
  { text: '> Access granted. Welcome.', delay: 2900 },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const endTimer = setTimeout(finish, 3400);
    return () => { timers.forEach(clearTimeout); clearTimeout(endTimer); };
  }, [finish]);

  // Skip on click
  const handleSkip = () => finish();

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] bg-terminal-bg flex items-center justify-center cursor-pointer"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-2xl px-6 font-mono text-sm">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`leading-relaxed ${
                  line.text.startsWith('>')
                    ? 'text-hacker-green-glow font-bold mt-2'
                    : 'text-hacker-green/80'
                }`}
              >
                {line.text}
                {i === visibleLines - 1 && (
                  <span className="inline-block w-2 h-4 bg-hacker-green-glow ml-1 animate-pulse" />
                )}
              </motion.div>
            ))}
            <p className="text-hacker-green/30 text-xs mt-6 text-center">
              Click anywhere to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
