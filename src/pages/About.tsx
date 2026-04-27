import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TypingEffect } from '@/components/effects/TypingEffect';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${developerInfo.name}, ${developerInfo.tagline}. ${developerInfo.biography.split('\n\n')[0]}`}
        image={developerInfo.portraitImage}
      />
      
      <div className="min-h-screen">
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-wide mb-3 md:mb-4">
                <TypingEffect text="About" speed={60} showCursor={false} />
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-light tracking-wide">
                Software Engineering Student & Front-End Developer
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[4/5] md:aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <img
                    src={developerInfo.portraitImage}
                    alt={`${developerInfo.name} portrait`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
                    {developerInfo.name}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                    {developerInfo.tagline}
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  {developerInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-base lg:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href={`mailto:${developerInfo.email}`}
                      className="text-foreground hover:text-muted-foreground transition-colors break-all"
                    >
                      {developerInfo.email}
                    </a>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Location: </span>
                    <span className="text-foreground">{developerInfo.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
