import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { MasonryCard } from './MasonryCard';

interface MasonryGridProps {
  projects: Project[];
}

/**
 * Pinterest-style masonry grid using CSS columns
 * Responsive: 1 col mobile, 2 tablet, 3 desktop
 */
export function MasonryGrid({ projects }: MasonryGridProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="break-inside-avoid mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
        >
          <MasonryCard project={project} index={index} />
        </motion.div>
      ))}
    </div>
  );
}
