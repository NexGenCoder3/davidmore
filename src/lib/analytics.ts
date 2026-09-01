import { track } from '@vercel/analytics';

/**
 * Track a primary CTA click.
 * `id` identifies the button, `page` is captured automatically.
 */
export function trackCTA(id: string, extra?: Record<string, string | number | boolean>) {
  try {
    track('cta_click', {
      cta: id,
      page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      ...extra,
    });
  } catch {
    // analytics must never break the UI
  }
}

/**
 * Delegated click listener: any element (or ancestor) carrying `data-cta`
 * reports a conversion event. Returns a cleanup function.
 */
export function installCTATracking(): () => void {
  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const el = target?.closest?.('[data-cta]') as HTMLElement | null;
    if (!el) return;
    const id = el.dataset.cta;
    if (!id) return;
    trackCTA(id, { label: (el.textContent || '').trim().slice(0, 60) });
  };
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true } as EventListenerOptions);
}
