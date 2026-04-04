import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TypingEffect } from '@/components/effects/TypingEffect';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${developerInfo.name}, ${developerInfo.tagline}. ${developerInfo.biography.split('\n\n')[0]}`}
        image={developerInfo.portraitImage}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
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
                Developer & Security Researcher
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portrait and Biography */}
        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Portrait Image */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[4/5] md:aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="https://images.pexels.com/videos/3888252/afro-hair-fashion-model-3888252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  >
                    <source src="https://videos.pexels.com/video-files/3888252/3888252-sd_426_226_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="size-5" />
                    </a>
                  )}
                  {developerInfo.socialLinks.linkedin && (
                    <a
                      href={developerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Biography and Info */}
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
