import { useEffect } from 'react';
import { installCTATracking } from '@/lib/analytics';

/**
 * Mounts a single delegated listener that reports clicks on any
 * element marked with `data-cta="<id>"` as a conversion event.
 */
export function CTATracker() {
  useEffect(() => installCTATracking(), []);
  return null;
}
