import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { CRTOverlay } from '@/components/effects/CRTOverlay';
import { CommandTerminal } from '@/components/effects/CommandTerminal';
import { CursorTrail } from '@/components/effects/CursorTrail';
import { useKonamiCode } from '@/hooks/useKonamiCode';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const { activated } = useKonamiCode();

  return (
    <div className="min-h-screen flex flex-col">
      <CRTOverlay />
      <CursorTrail />
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <CommandTerminal />

      {/* Konami Code Easter Egg */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          >
            <div className="text-center font-mono">
              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-6xl font-bold text-hacker-green-glow"
                style={{ textShadow: '0 0 30px rgba(34,197,94,0.8), 0 0 60px rgba(34,197,94,0.4)' }}
              >
                ACCESS LEVEL: ROOT
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-hacker-green/60 mt-4 text-sm"
              >
                ⚡ All privileges granted ⚡
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
