import { useCallback, useEffect, useState } from 'react';

const KEY = 'custom-cursor';
type Pref = 'on' | 'off';

function read(): Pref {
  if (typeof window === 'undefined') return 'on';
  try {
    return (localStorage.getItem(KEY) as Pref) === 'off' ? 'off' : 'on';
  } catch {
    return 'on';
  }
}

export function useCursorPreference() {
  const [pref, setPref] = useState<Pref>(() => read());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPref(read());
    };
    const onCustom = () => setPref(read());
    window.addEventListener('storage', onStorage);
    window.addEventListener('cursor-pref-changed', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cursor-pref-changed', onCustom);
    };
  }, []);

  const set = useCallback((next: Pref) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setPref(next);
    window.dispatchEvent(new Event('cursor-pref-changed'));
  }, []);

  const toggle = useCallback(() => set(read() === 'on' ? 'off' : 'on'), [set]);

  return { pref, set, toggle, enabled: pref === 'on' };
}
