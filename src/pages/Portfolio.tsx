import { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import { getProjectsByCategory } from '@/data/projects';
import { MasonryGrid } from '@/components/portfolio/MasonryGrid';
import { CategoryFilter } from '@/components/portfolio/CategoryFilter';
import { StatsCounter } from '@/components/portfolio/StatsCounter';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'security', label: 'Security' },
  { id: 'tools', label: 'Tools' },
  { id: 'automation', label: 'Automation' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'open-source', label: 'Open Source' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory]
  );

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

        {/* Stats Counter */}
        <section className="py-12 md:py-16">
          <StatsCounter />
        </section>

        {/* Category Filter */}
        <section className="pb-8 px-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Portfolio Grid */}
        <section className="py-4 md:py-8 px-2 md:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <MasonryGrid projects={filteredProjects} />
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
