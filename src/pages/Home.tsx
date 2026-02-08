import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MatrixRain } from '@/components/effects/MatrixRain';
import { TypingEffect } from '@/components/effects/TypingEffect';

/**
 * Homepage with immersive hero section and featured projects grid
 * Showcases developer's best work with minimal, elegant design
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      {/* Matrix Rain Background */}
      <MatrixRain />

      <div className="min-h-screen relative z-10">
        {/* Hero Section - Terminal Style */}
        <section className="relative h-screen w-full overflow-hidden bg-black/90">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />

          {/* Hero Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6">
            {/* Terminal Window */}
            <motion.div
              className="w-full max-w-4xl bg-black/80 border border-primary/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.3)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-b border-primary/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-amber" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-primary/60 text-sm font-mono">terminal@david-more:~</span>
                </div>
                <Terminal className="w-4 h-4 text-primary/60" />
              </div>

              {/* Terminal Content */}
              <div className="p-6 md:p-8 font-mono space-y-4">
                <div className="text-primary/60 text-sm">
                  <span className="text-primary">$</span> whoami
                </div>
                
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TypingEffect 
                    text={developerInfo.name.toUpperCase()} 
                    speed={100}
                    delay={500}
                  />
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="space-y-2"
                >
                  <div className="text-primary/60 text-sm">
                    <span className="text-primary">$</span> cat role.txt
                  </div>
                  <p className="text-xl md:text-2xl text-primary/90">
                    {developerInfo.tagline}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                  className="space-y-2"
                >
                  <div className="text-primary/60 text-sm">
                    <span className="text-primary">$</span> cat mission.txt
                  </div>
                  <p className="text-base md:text-lg text-primary/70 max-w-2xl">
                    {developerInfo.heroIntroduction}
                  </p>
                </motion.div>

                <motion.div
                  className="pt-4 text-primary/40 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                >
                  <span className="text-primary">$</span> <span className="animate-pulse">█</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              About My Work
            </h2>
            <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground">
              <p>
                {developerInfo.biography.split('\n\n')[0]}
              </p>
            </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span>Learn More About Me</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid - Edge to edge with minimal gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
