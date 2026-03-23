import { useLocation } from 'react-router-dom';
import { useRef, useMemo, useCallback } from 'react';

const routeLabels: Record<string, string> = {
  '/': '> initializing dashboard...',
  '/portfolio': '> loading portfolio...',
  '/about': '> decrypting profile...',
  '/contact': '> opening secure channel...',
  '/skills': '> scanning capabilities...',
  '/blog': '> fetching transmissions...',
  '/resume': '> loading credentials...',
  '/accessibility': '> checking compliance...',
};

/** Micro-jitter values for each slat — randomized per transition */
export interface SlatConfig {
  offsetY: number;    // ±2-6px
  delayJitter: number; // ±0.01s
  rotationJitter: number; // ±1deg
}

export function usePageTransition() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const historyStack = useRef<string[]>([location.pathname]);

  // Determine navigation direction
  const direction = useMemo(() => {
    const prev = prevPathRef.current;
    const curr = location.pathname;
    prevPathRef.current = curr;

    const stack = historyStack.current;
    const prevIndex = stack.lastIndexOf(prev);
    
    if (stack.length > 1 && prevIndex >= 0 && stack[prevIndex - 1] === curr) {
      // Going back
      historyStack.current = stack.slice(0, prevIndex);
      return 'back' as const;
    } else {
      stack.push(curr);
      return 'forward' as const;
    }
  }, [location.pathname]);

  // Generate jitter for 5 slats
  const slatConfigs = useMemo((): SlatConfig[] => {
    return Array.from({ length: 5 }, () => ({
      offsetY: (Math.random() - 0.5) * 8,   // ±4px
      delayJitter: (Math.random() - 0.5) * 0.02, // ±0.01s
      rotationJitter: (Math.random() - 0.5) * 2,  // ±1deg
    }));
  }, [location.pathname]); // regenerate on every route change

  // Route-aware terminal text
  const terminalText = useMemo(() => {
    return routeLabels[location.pathname] || `> cd ${location.pathname}`;
  }, [location.pathname]);

  // Reduced motion check
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return {
    direction,
    slatConfigs,
    terminalText,
    prefersReducedMotion,
    pathname: location.pathname,
  };
}
