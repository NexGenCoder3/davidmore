import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'home',
  '/portfolio': 'portfolio',
  '/about': 'about',
  '/contact': 'contact',
  '/skills': 'skills',
  '/blog': 'blog',
  '/resume': 'resume',
  '/demo-analytics': 'admin',
  '/accessibility': 'accessibility',
};

const DURATION = 650;

export function RouteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    setVisible(true);
    setKey((k) => k + 1);
    const t = setTimeout(() => setVisible(false), DURATION);
    return () => clearTimeout(t);
  }, [location.pathname, reduced]);

  if (reduced) return null;

  const path = location.pathname;
  const label =
    ROUTE_LABELS[path] ??
    (path.startsWith('/blog/') ? `blog/${path.split('/').pop()}` : path.replace(/^\//, '') || 'route');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-black/85 backdrop-blur-sm"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_3px]" />

          <div className="relative w-[min(440px,86vw)] rounded-lg border border-primary/40 bg-black/85 p-5 font-mono text-[12px] md:text-sm text-primary shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
              <span className="size-2 rounded-full bg-red-500/70" />
              <span className="size-2 rounded-full bg-yellow-500/70" />
              <span className="size-2 rounded-full bg-green-500/70" />
              <span className="ml-2 text-primary/60 text-[10px] md:text-xs truncate">
                guest@dm:~$ load {label}
              </span>
            </div>

            <div className="space-y-1 text-primary/85">
              <Line text={`> mounting ${label}...`} delay={0} />
              <Line text="> establishing connection... [OK]" delay={120} />
              <Line text="> rendering view... [OK]" delay={260} />
            </div>

            <div className="mt-3 h-1 w-full overflow-hidden rounded-sm bg-primary/10 border border-primary/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION / 1000, ease: 'easeOut' }}
                className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.7)]"
              />
            </div>

            <div className="mt-2 flex items-center gap-1 text-primary/70 text-[11px]">
              <span>$</span>
              <span className="inline-block w-2 h-3 bg-primary animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, delay: delay / 1000, ease: 'easeOut' }}
      className="whitespace-nowrap overflow-hidden"
    >
      {text}
    </motion.div>
  );
}
