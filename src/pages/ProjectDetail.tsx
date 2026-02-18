import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Code, User, Target, Lightbulb, CheckCircle, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug } from '@/data/projects';
import { caseStudies } from '@/data/caseStudies';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';

/**
 * Project detail page with hero image, gallery, and full-screen lightbox
 * Features smooth animations and immersive image viewing experience
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />
      
      <div className="min-h-screen">
        {/* Hero Image - 70vh */}
      <motion.div
        className="relative w-full h-[70vh] overflow-hidden bg-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </motion.div>

      {/* Project Info Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title and Category */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 capitalize">
                <span>•</span>
                <span>{project.category}</span>
              </div>
              {project.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{project.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
              {project.description}
            </p>
          </div>

          {/* Technical Details */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {project.tech && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <Code className="size-4" />
                  <span>Tech Stack</span>
                </div>
                <p className="font-light text-foreground">{project.tech}</p>
              </div>
            )}
            {project.client && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <User className="size-4" />
                  <span>Client</span>
                </div>
                <p className="font-light text-foreground">{project.client}</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Case Study Section */}
      {caseStudies[project.slug] && (
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 font-mono">
          {(() => {
            const cs = caseStudies[project.slug];
            return (
              <div className="space-y-10">
                {/* Challenge */}
                <ScrollReveal>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                      <Target className="size-4" /> THE CHALLENGE
                    </div>
                    <p className="text-muted-foreground font-light font-sans">{cs.challenge}</p>
                  </div>
                </ScrollReveal>

                {/* Approach */}
                <ScrollReveal delay={0.1}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                      <Lightbulb className="size-4" /> THE APPROACH
                    </div>
                    <p className="text-muted-foreground font-light font-sans">{cs.approach}</p>
                  </div>
                </ScrollReveal>

                {/* Key Features */}
                <ScrollReveal delay={0.2}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                      <CheckCircle className="size-4" /> KEY FEATURES
                    </div>
                    <ul className="space-y-2">
                      {cs.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm font-sans">
                          <span className="text-hacker-green mt-1">▸</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Results */}
                <ScrollReveal delay={0.3}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                      <Target className="size-4" /> RESULTS & IMPACT
                    </div>
                    <ul className="space-y-2">
                      {cs.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm font-sans">
                          <span className="text-hacker-green mt-1">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Code Snippet */}
                {cs.codeSnippet && (
                  <ScrollReveal delay={0.4}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                        <Code className="size-4" /> CODE SNIPPET
                      </div>
                      <p className="text-muted-foreground/60 text-xs">{cs.codeSnippet.caption}</p>
                      <pre className="bg-terminal-bg border border-hacker-green/20 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-hacker-green/80">{cs.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </ScrollReveal>
                )}

                {/* Lessons Learned */}
                <ScrollReveal delay={0.5}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-hacker-green-glow text-sm font-bold">
                      <BookOpen className="size-4" /> LESSONS LEARNED
                    </div>
                    <ul className="space-y-2">
                      {cs.lessons.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm font-sans">
                          <span className="text-hacker-green mt-1">→</span> {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            );
          })()}
        </section>
      )}

        {/* Image Gallery - Edge to edge */}
        <section className="py-12 md:py-16">
          <div className="space-y-8 md:space-y-12">
            {project.images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
                <ImageWithLightbox
                  image={image}
                  onClick={() => openLightbox(index)}
                  priority={index === 0}
                  index={0}
                  className="w-full"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
