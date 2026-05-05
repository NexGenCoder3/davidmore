import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'pointer' | 'text';

const POINTER_SELECTOR =
  'a, button, [role="button"], summary, label, select, [data-cursor="pointer"]';
const TEXT_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"], [data-cursor="text"]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [mode, setMode] = useState<CursorMode>('default');
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element)) return;
      if (t.closest(TEXT_SELECTOR)) setMode('text');
      else if (t.closest(POINTER_SELECTOR)) setMode('pointer');
      else setMode('default');
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const tick = () => {
      const t = target.current;
      const r = ringPos.current;
      r.x += (t.x - r.x) * 0.18;
      r.y += (t.y - r.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  const ringW = mode === 'pointer' ? 48 : mode === 'text' ? 4 : 32;
  const ringH = mode === 'text' ? 26 : ringW;
  const radius = mode === 'text' ? 2 : 999;
  const bg =
    mode === 'pointer'
      ? 'hsl(var(--primary) / 0.18)'
      : mode === 'text'
      ? 'hsl(var(--primary) / 0.9)'
      : 'transparent';
  const border = mode === 'text' ? '0' : '1.5px solid hsl(var(--primary) / 0.85)';
  const scale = pressed ? 0.85 : 1;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{
          width: ringW,
          height: ringH,
          borderRadius: radius,
          border,
          background: bg,
          transition:
            'width 180ms ease-out, height 180ms ease-out, background-color 180ms ease-out, border-radius 180ms ease-out, opacity 200ms ease-out, scale 120ms ease-out',
          scale: String(scale),
          willChange: 'transform',
          boxShadow: mode === 'pointer' ? '0 0 14px hsl(var(--primary) / 0.35)' : 'none',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'hsl(var(--primary))',
          boxShadow: '0 0 8px hsl(var(--primary) / 0.8)',
          opacity: mode === 'pointer' || mode === 'text' ? 0 : 1,
          transition: 'opacity 150ms ease-out',
          willChange: 'transform',
        }}
      />
    </>
  );
}
