import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface MasonryCardProps {
  project: Project;
  index: number;
}

// Vary aspect ratio based on index for natural masonry effect
const getAspectRatio = (index: number) => {
  const ratios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/2]', 'aspect-[2/3]', 'aspect-[4/3]'];
  return ratios[index % ratios.length];
};

/**
 * Masonry-style project card with varying heights,
 * description, tech tags, and hover overlay
 */
export function MasonryCard({ project, index }: MasonryCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const techTags = project.tech?.split(', ') || [];

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block rounded-lg overflow-hidden bg-card border border-border hover:border-primary/30 transition-colors duration-300"
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden bg-muted', getAspectRatio(index))}>
        {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
        <img
          src={project.coverImage}
          alt={project.title}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-transform duration-700',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-105'
          )}
          loading={index < 6 ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-primary/70">
          <span className="capitalize">{project.category}</span>
          <span className="text-muted-foreground">•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techTags.map((tag) => (
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
    </Link>
  );
}
