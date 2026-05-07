import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LetterReveal } from '@/components/effects/LetterReveal';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { Tilt3DCard } from '@/components/effects/Tilt3DCard';
import { developerInfo } from '@/data/developer';

export function HeroPoster() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Tilt3DCard max={4} className="rounded-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-black/50 backdrop-blur-xl shadow-[0_0_60px_rgba(34,197,94,0.15),inset_0_1px_0_rgba(255,255,255,0.04)]">
            {/* Animated gradient sheen */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 0%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(ellipse at 100% 100%, hsl(var(--primary) / 0.08), transparent 50%)',
              }}
            />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_3px] pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-10 md:p-14">
              <div className="flex flex-col justify-center space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono"
                >
                  <Sparkles className="size-3" /> Available · responds in 24h
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                  <LetterReveal text="Build systems" stagger={0.04} />
                  <br />
                  <span className="text-primary drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]">
                    <LetterReveal text="that ship." delay={0.4} stagger={0.04} />
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="text-base sm:text-lg text-muted-foreground font-light max-w-md"
                >
                  {developerInfo.heroIntroduction}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0 }}
                  className="flex flex-wrap gap-3 pt-2"
                >
                  <MagneticButton>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-[0_0_24px_rgba(34,197,94,0.35)] hover:shadow-[0_0_32px_rgba(34,197,94,0.55)] transition-shadow"
                    >
                      View Work <ArrowRight className="size-4" />
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-colors font-mono"
                    >
                      $ hire-me
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Right: glass monogram */}
              <div className="relative min-h-[220px] md:min-h-[320px] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full" />
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl border border-primary/40 bg-black/60 backdrop-blur-md flex items-center justify-center font-mono text-primary text-7xl sm:text-8xl md:text-9xl font-bold drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                    DM
                    <div className="absolute inset-0 rounded-2xl border border-primary/20 animate-pulse" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </section>
  );
}
