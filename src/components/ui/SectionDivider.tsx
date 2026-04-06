export function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div
        className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.4), transparent)',
          backgroundSize: '200% 100%',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
