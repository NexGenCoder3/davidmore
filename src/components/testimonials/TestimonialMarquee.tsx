import type { Testimonial } from '@/types';

interface Props {
  testimonials: Testimonial[];
}

function MarqueeRow({ testimonials, reverse = false }: { testimonials: Testimonial[]; reverse?: boolean }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-4 ${reverse ? 'animate-[marquee-reverse_40s_linear_infinite]' : 'animate-[marquee_40s_linear_infinite]'}`}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="flex-shrink-0 w-[340px] md:w-[400px] p-5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2)] font-mono"
          >
            <p className="text-primary/80 text-sm leading-relaxed line-clamp-4">"{t.quote}"</p>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="text-primary/70 font-medium">{t.name}</span> • {t.role}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function TestimonialMarquee({ testimonials }: Props) {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <div className="space-y-4 overflow-hidden">
      <MarqueeRow testimonials={[...row1, ...row2]} />
      <MarqueeRow testimonials={[...row2, ...row1]} reverse />
    </div>
  );
}
