import { useCallback, useEffect, useMemo, useState } from 'react';

const KEY = 'scene3d-pref';
export type Scene3DPref = 'auto' | 'on' | 'off';

function read(): Scene3DPref {
  if (typeof window === 'undefined') return 'auto';
  try {
    const v = localStorage.getItem(KEY);
    return v === 'on' || v === 'off' ? v : 'auto';
  } catch {
    return 'auto';
  }
}

function autoCapable(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const lowCpu = (navigator.hardwareConcurrency ?? 4) < 4;
  if (isTouch && (window.innerWidth < 768 || lowCpu)) return false;
  return webglOk();
}

function webglOk(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function useScene3DPreference() {
  const [pref, setPrefState] = useState<Scene3DPref>(() => read());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPrefState(read());
    };
    const onCustom = () => setPrefState(read());
    window.addEventListener('storage', onStorage);
    window.addEventListener('scene3d-pref-changed', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('scene3d-pref-changed', onCustom);
    };
  }, []);

  const set = useCallback((next: Scene3DPref) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setPrefState(next);
    window.dispatchEvent(new Event('scene3d-pref-changed'));
  }, []);

  const cycle = useCallback(() => {
    const order: Scene3DPref[] = ['auto', 'on', 'off'];
    set(order[(order.indexOf(read()) + 1) % order.length]);
  }, [set]);

  const enabled = useMemo(() => {
    if (!mounted) return false;
    if (pref === 'off') return false;
    if (pref === 'on') return webglOk();
    return autoCapable();
  }, [pref, mounted]);

  return { pref, set, toggle: cycle, cycle, enabled };
}
