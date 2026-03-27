import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const routeLabels: Record<string, string> = {
  '/portfolio': 'portfolio',
  '/skills': 'skills',
  '/blog': 'blog',
  '/about': 'about',
  '/contact': 'contact',
  '/resume': 'resume',
  '/accessibility': 'accessibility',
};

export function BackNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  const label = routeLabels[pathname] || pathname.split('/').filter(Boolean).pop() || 'page';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="sticky top-16 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-10 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-200 group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>back</span>
        </button>
        <span className="text-muted-foreground/40 font-mono text-xs">/</span>
        <span className="text-sm font-mono text-primary">
          ~/{label}
        </span>
      </div>
    </motion.div>
  );
}
