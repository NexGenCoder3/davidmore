import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { testimonials } from '@/data/testimonials';
import { Tilt3DCard } from '@/components/effects/Tilt3DCard';

export function TestimonialQuoteCard() {
  const t = testimonials[1] ?? testimonials[0];
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Tilt3DCard max={5} className="rounded-2xl">
          <div className="relative rounded-2xl p-[1px] bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.6),transparent,hsl(var(--primary)/0.4),transparent,hsl(var(--primary)/0.6))]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
              style={{
                background:
                  'conic-gradient(from 0deg, hsl(var(--primary) / 0.6), transparent 30%, transparent 70%, hsl(var(--primary) / 0.6))',
              }}
            />
            <div className="relative rounded-2xl bg-black/70 backdrop-blur-xl p-8 sm:p-10 md:p-14">
              <Quote className="size-10 text-primary/40 mb-4" />
              <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-foreground/95 italic">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <div className="size-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                  {t.name
                    .split(' ')
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{t.role}</div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-primary/10">
                <Link
                  to="/about"
                  className="text-sm text-primary hover:text-primary/80 font-mono"
                >
                  $ cat more-testimonials.log →
                </Link>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </section>
  );
}
