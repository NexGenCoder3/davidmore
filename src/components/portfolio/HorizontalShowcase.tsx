import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';

interface HorizontalShowcaseProps {
  projects: Project[];
}

export function HorizontalShowcase({ projects }: HorizontalShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scrollLeft: containerRef.current?.scrollLeft || 0 };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.pageX - dragStart.current.x;
    containerRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  }, [isDragging]);

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 px-4 md:px-8 pb-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center"
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={`/project/${project.slug}`}>
              <GlassCard className="h-full group cursor-pointer" hoverEffect>
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-hacker-green-glow/80 mb-1 md:mb-2">
                      <span className="capitalize">{project.category}</span>
                      <span className="text-white/30">•</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 md:p-6 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  {project.tech && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.split(', ').map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary/80 border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-hacker-green/30"
            style={{
              scale: useTransform(
                scrollXProgress,
                [i / projects.length, (i + 0.5) / projects.length, (i + 1) / projects.length],
                [0.8, 1.4, 0.8]
              ),
              opacity: useTransform(
                scrollXProgress,
                [i / projects.length, (i + 0.5) / projects.length, (i + 1) / projects.length],
                [0.3, 1, 0.3]
              ),
            }}
          />
        ))}
      </div>
    </div>
  );
}
