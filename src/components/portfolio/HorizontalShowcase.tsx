import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';

interface HorizontalShowcaseProps {
  projects: Project[];
}

export function HorizontalShowcase({ projects }: HorizontalShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < maxScroll - 10);

    // Calculate active index based on scroll position
    const cardWidth = el.scrollWidth / projects.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, projects.length - 1));
  }, [projects.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  }, [projects.length]);

  const scrollPrev = useCallback(() => scrollToIndex(Math.max(0, activeIndex - 1)), [activeIndex, scrollToIndex]);
  const scrollNext = useCallback(() => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1)), [activeIndex, projects.length, scrollToIndex]);

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
    <div className="relative group/showcase">
      {/* Prev Button */}
      <AnimatePresence>
        {canScrollPrev && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollPrev}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 
              w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center
              bg-black/60 backdrop-blur-md border border-primary/30 
              shadow-[0_0_15px_hsl(var(--primary)/0.2)]
              hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:border-primary/60 hover:bg-black/80
              transition-all duration-300 cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <AnimatePresence>
        {canScrollNext && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollNext}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20
              w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center
              bg-black/60 backdrop-blur-md border border-primary/30
              shadow-[0_0_15px_hsl(var(--primary)/0.2)]
              hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:border-primary/60 hover:bg-black/80
              transition-all duration-300 cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cards Container */}
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

      {/* Clickable Progress Dots */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${activeIndex === i
                ? 'w-8 h-2.5 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]'
                : 'w-2.5 h-2.5 bg-primary/30 hover:bg-primary/50'
              }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
