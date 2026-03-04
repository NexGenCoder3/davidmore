import { projects } from '@/data/projects';
import { MasonryGrid } from '@/components/portfolio/MasonryGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';

/**
 * Portfolio page with project grid
 * Features smooth animations and responsive layout
 */
export default function Portfolio() {

  return (
    <>
      <SEOHead 
        title="Portfolio"
        description="Browse my complete project portfolio featuring web applications, security tools, automation scripts, and open-source contributions."
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
              A curated collection of projects spanning web development, security, and automation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Edge to edge */}
      <section className="py-12 md:py-16 px-2 md:px-4">
        <MasonryGrid projects={projects} />
      </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
