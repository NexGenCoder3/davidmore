import { Suspense, lazy, useEffect, useState } from 'react';

const Inner = lazy(() => import('./Scene3DInner'));

/**
 * Lightweight cinematic 3D background.
 * - Auto-disabled on touch + small viewport, reduced motion, low CPU, or no WebGL
 * - Mounted once globally; renders behind page content
 */
export function Scene3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 4) < 4;
    if (isTouch && (window.innerWidth < 768 || lowCpu)) return;

    // Probe WebGL
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) return;
    } catch {
      return;
    }

    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.35]"
      style={{ mixBlendMode: 'screen' }}
      data-testid="scene3d"
    >
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </div>
  );
}
