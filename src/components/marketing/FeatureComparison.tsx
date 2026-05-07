import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Cell = boolean | 'partial';

const ROWS: { feature: string; typical: Cell; senior: Cell; david: Cell }[] = [
  { feature: 'Full-stack depth', typical: false, senior: true, david: true },
  { feature: 'Security-first mindset', typical: false, senior: 'partial', david: true },
  { feature: 'Ships in days, not weeks', typical: 'partial', senior: true, david: true },
  { feature: 'Clear daily communication', typical: false, senior: true, david: true },
  { feature: 'Post-launch support', typical: false, senior: 'partial', david: true },
  { feature: 'Modern animations & UX', typical: false, senior: 'partial', david: true },
];

function Glyph({ value }: { value: Cell }) {
  if (value === true)
    return <Check className="size-5 text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />;
  if (value === 'partial')
    return <Minus className="size-5 text-primary/50" />;
  return <Minus className="size-5 text-muted-foreground/40" />;
}

const cols = ['Typical Dev', 'Senior Dev', 'David More'] as const;

export function FeatureComparison() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            Why work with <span className="text-primary">David</span>
          </h2>
          <p className="text-muted-foreground font-light">A side-by-side look at what you actually get.</p>
        </motion.div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-primary/20 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.1)]">
            <div className="grid grid-cols-4 gap-px bg-primary/10">
              <div className="bg-black/60 p-5 text-xs font-mono text-muted-foreground uppercase">
                Feature
              </div>
              {cols.map((c, i) => (
                <div
                  key={c}
                  className={cn(
                    'bg-black/60 p-5 text-center font-mono text-sm relative',
                    i === 2 && 'bg-primary/10 ring-1 ring-primary/40'
                  )}
                >
                  <div className={cn('font-bold', i === 2 ? 'text-primary' : 'text-foreground')}>
                    {c}
                  </div>
                  {i === 2 && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      RECOMMENDED
                    </div>
                  )}
                </div>
              ))}
              {ROWS.map((row, idx) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="contents"
                >
                  <div className="bg-black/40 p-4 text-sm text-foreground/90 font-light">
                    {row.feature}
                  </div>
                  <div className="bg-black/40 p-4 flex justify-center">
                    <Glyph value={row.typical} />
                  </div>
                  <div className="bg-black/40 p-4 flex justify-center">
                    <Glyph value={row.senior} />
                  </div>
                  <div className="bg-primary/[0.06] p-4 flex justify-center ring-1 ring-primary/20">
                    <Glyph value={row.david} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden space-y-4">
          {cols.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                'rounded-xl border bg-black/50 backdrop-blur-xl p-5',
                i === 2
                  ? 'border-primary/50 ring-1 ring-primary/40 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                  : 'border-primary/15'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={cn('font-bold', i === 2 ? 'text-primary' : 'text-foreground')}>{c}</h3>
                {i === 2 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {ROWS.map((row) => {
                  const v = i === 0 ? row.typical : i === 1 ? row.senior : row.david;
                  return (
                    <li key={row.feature} className="flex items-center gap-3 text-sm">
                      <Glyph value={v} />
                      <span className={v ? 'text-foreground/90' : 'text-muted-foreground/60'}>
                        {row.feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
