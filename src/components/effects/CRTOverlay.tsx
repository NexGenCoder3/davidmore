/**
 * CRT scanline overlay effect applied to the entire page
 * Creates retro terminal monitor vibes with scanlines and vignette
 */
export function CRTOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)`,
        }}
      />
      {/* Subtle flicker */}
      <div className="absolute inset-0 opacity-[0.015] animate-[crt-flicker_0.15s_infinite]" 
        style={{ backgroundColor: 'hsl(var(--primary))' }}
      />
    </div>
  );
}
