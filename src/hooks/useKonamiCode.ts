import { useEffect, useState, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/**
 * Detects the Konami code and triggers a temporary "ROOT ACCESS" mode
 */
export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [index, setIndex] = useState(0);

  const reset = useCallback(() => {
    setActivated(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI_SEQUENCE[index]) {
        const next = index + 1;
        if (next === KONAMI_SEQUENCE.length) {
          setActivated(true);
          setIndex(0);
          // Auto-reset after 5 seconds
          setTimeout(() => setActivated(false), 5000);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index]);

  return { activated, reset };
}
