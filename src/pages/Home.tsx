import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MatrixRain } from '@/components/effects/MatrixRain';
import { GlitchText } from '@/components/effects/GlitchText';
import { MasonryGrid } from '@/components/portfolio/MasonryGrid';
import { HorizontalShowcase } from '@/components/portfolio/HorizontalShowcase';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { ParallaxSection } from '@/components/effects/ParallaxSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { projects } from '@/data/projects';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      <MatrixRain />

      <div className="min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden bg-black/90">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10" />
          <ParallaxSection speed={-0.15} className="absolute inset-0 opacity-10">
            <div className="w-full h-[120%]" style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </ParallaxSection>

          <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-6 z-20">
            <motion.div
              className="w-full max-w-4xl bg-black/80 backdrop-blur-xl border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-primary/10 border-b border-primary/20">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-primary/60 text-xs md:text-sm font-mono truncate">terminal@david-more:~</span>
                </div>
                <Terminal className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
              </div>

              <div className="p-4 md:p-6 lg:p-8 font-mono space-y-3 md:space-y-4">
                <div className="text-primary/60 text-xs md:text-sm">
                  <span className="text-primary">$</span> whoami
                </div>
                <motion.div
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <GlitchText text={developerInfo.name.toUpperCase()} as="h1" glitchIntensity="medium" />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="space-y-2">
                  <div className="text-primary/60 text-xs md:text-sm"><span className="text-primary">$</span> cat role.txt</div>
                  <p className="text-lg md:text-xl lg:text-2xl text-primary/90">{developerInfo.tagline}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} className="space-y-2">
                  <div className="text-primary/60 text-xs md:text-sm"><span className="text-primary">$</span> cat mission.txt</div>
                  <p className="text-sm md:text-base lg:text-lg text-primary/70 max-w-2xl">{developerInfo.heroIntroduction}</p>
                </motion.div>
                <motion.div className="pt-2 md:pt-4 text-primary/40 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }}>
                  <span className="text-primary">$</span> <span className="animate-pulse">█</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="absolute bottom-8 md:bottom-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">About My Work</h2>
                <div className="space-y-4 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  <p>{developerInfo.biography.split('\n\n')[0]}</p>
                </div>
                <MagneticButton>
                  <Link to="/about" className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group">
                    <span>Learn More About Me</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Horizontal Project Showcase */}
        <section className="py-16 md:py-24 lg:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">Featured Projects</h2>
              <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide">Swipe to explore recent work</p>
            </div>
          </ScrollReveal>
          <HorizontalShowcase projects={featuredProjects} />
        </section>

        {/* All Projects Masonry */}
        <section className="py-16 md:py-24 lg:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">All Projects</h2>
              <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide">The complete collection</p>
            </div>
          </ScrollReveal>
          <div className="px-4 md:px-8">
            <MasonryGrid projects={projects} />
          </div>
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-12 md:mt-16 px-6">
              <MagneticButton>
                <Link to="/portfolio" className="group inline-flex items-center gap-2 text-base md:text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                  <span>View All Projects</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 lg:py-32 border-t border-border bg-terminal-bg">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-mono text-hacker-green-glow font-bold">TESTIMONIALS</h2>
              <p className="text-hacker-green/50 font-mono text-xs md:text-sm">$ cat /var/log/feedback.log</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={0.3 + i * 0.5} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
