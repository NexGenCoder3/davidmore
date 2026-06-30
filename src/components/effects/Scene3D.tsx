import { Suspense, lazy } from 'react';
import { useScene3DPreference } from '@/hooks/useScene3DPreference';

const Inner = lazy(() => import('./Scene3DInner'));

/**
 * Lightweight cinematic 3D background.
 * Gated by useScene3DPreference (auto/on/off) — auto respects reduced-motion,
 * touch+small viewport, low CPU, and WebGL availability.
 */
export function Scene3D() {
  const { enabled } = useScene3DPreference();
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
