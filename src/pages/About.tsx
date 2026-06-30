import { Link } from 'react-router-dom';
import { Github, Mail, MapPin, Code2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { SEOHead } from '@/components/seo/SEOHead';
import { TypingEffect } from '@/components/effects/TypingEffect';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { FadeUp, StaggerGroup, staggerItem } from '@/components/effects/Motion';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const pillars = [
  {
    icon: Code2,
    title: 'Front-End Engineering',
    body: 'React, TypeScript, Vite, and Tailwind — production-grade UIs built clean and built to last.',
  },
  {
    icon: Sparkles,
    title: 'Cinematic UI',
    body: 'Motion, glass, and 3D layered with restraint to make interfaces feel alive, not noisy.',
  },
  {
    icon: ShieldCheck,
    title: 'Ship-Ready Quality',
    body: 'Accessible, fast, SEO-aware, and tested — work that holds up after launch day.',
  },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`${developerInfo.name} — ${developerInfo.tagline}. Building fast, accessible, cinematic web experiences with React, TypeScript, and a relentless focus on craft.`}
        image={developerInfo.portraitImage}
      />

      <div className="min-h-screen">
        {/* HERO / VALUE PROP */}
        <section className="relative px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-primary/80 bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5 backdrop-blur-md">
                <span className="text-primary">~/about $</span>
                <span>whoami</span>
                <span className="text-foreground/70">→ david.more</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                <TypingEffect
                  text="Building cinematic, production-grade web experiences."
                  speed={28}
                  showCursor={false}
                />
              </h1>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                {developerInfo.heroIntroduction}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* PORTRAIT + IDENTITY */}
        <section className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 md:gap-8 items-stretch">
            <FadeUp className="md:col-span-2">
              <TiltCard className="h-full">
                <GlassCard className="h-full p-3">
                  <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
                    <img
                      src={developerInfo.portraitImage}
                      alt={`${developerInfo.name} portrait`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                </GlassCard>
              </TiltCard>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-3">
              <GlassCard className="h-full p-6 md:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-4xl font-light tracking-tight">
                    {developerInfo.name}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground font-light">
                    {developerInfo.tagline}
                  </p>
                </div>

                <dl className="font-mono text-xs md:text-sm space-y-2.5">
                  <div className="flex gap-3">
                    <dt className="text-primary/80 min-w-[90px]">location:</dt>
                    <dd className="text-foreground/90 inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" /> {developerInfo.location}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-primary/80 min-w-[90px]">email:</dt>
                    <dd>
                      <a
                        href={`mailto:${developerInfo.email}`}
                        className="text-foreground/90 hover:text-primary transition-colors inline-flex items-center gap-1.5 break-all"
                      >
                        <Mail className="size-3.5 shrink-0" /> {developerInfo.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-primary/80 min-w-[90px]">status:</dt>
                    <dd className="text-foreground/90 inline-flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      {developerInfo.availability}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-primary/80 min-w-[90px]">education:</dt>
                    <dd className="text-foreground/90">{developerInfo.education}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-3 pt-2">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/40 backdrop-blur-md text-sm hover:border-primary/60 hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-4" /> GitHub
                    </a>
                  )}
                  <a
                    href={`mailto:${developerInfo.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/40 backdrop-blur-md text-sm hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    <Mail className="size-4" /> Email
                  </a>
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </section>

        {/* VALUE PILLARS */}
        <section className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            <FadeUp className="space-y-2">
              <p className="font-mono text-xs text-primary/70">// what i do</p>
              <h2 className="text-2xl md:text-4xl font-light tracking-tight">
                Three things, done seriously.
              </h2>
            </FadeUp>

            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {pillars.map(({ icon: Icon, title, body }) => (
                <motion.div key={title} variants={staggerItem}>
                  <GlassCard className="h-full p-6 md:p-7 space-y-4">
                    <div className="inline-flex items-center justify-center size-11 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium tracking-tight">{title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {body}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* APPROACH */}
        <section className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <GlassCard className="p-6 md:p-10 grid md:grid-cols-5 gap-6 md:gap-10">
                <div className="md:col-span-2 space-y-2">
                  <p className="font-mono text-xs text-primary/70">// approach</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight">
                    How I work.
                  </h2>
                </div>
                <div className="md:col-span-3 space-y-4">
                  {developerInfo.approach.split('\n\n').map((p, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base text-muted-foreground font-light leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </section>

        {/* BIO */}
        <section className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <GlassCard className="p-6 md:p-10 space-y-5">
                <div className="space-y-2">
                  <p className="font-mono text-xs text-primary/70">// background</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight">
                    A bit more context.
                  </h2>
                </div>
                <div className="space-y-4">
                  {developerInfo.biography.split('\n\n').map((p, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base text-muted-foreground font-light leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 md:px-6 lg:px-8 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <GlassCard className="p-8 md:p-12 text-center space-y-5">
                <h2 className="text-2xl md:text-4xl font-light tracking-tight">
                  Have something to build?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto">
                  Internships, freelance, or a long-term role — I'm open to projects where craft matters.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Button asChild variant="glow" size="lg">
                    <Link to="/contact">
                      Start a project <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/portfolio">View portfolio</Link>
                  </Button>
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
}
