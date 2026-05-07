import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types';
import { Clock, Tag } from 'lucide-react';
import { Tilt3DCard } from '@/components/effects/Tilt3DCard';

export function BlogCard({ post, delay }: { post: BlogPost; delay: number }) {
  const visibleTags = post.tags.slice(0, 3);
  const overflow = post.tags.length - visibleTags.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Tilt3DCard max={5}>
        <Link
          to={`/blog/${post.slug}`}
          className="block font-mono border border-hacker-green/20 rounded-lg p-4 sm:p-5 hover:border-hacker-green/50 hover:bg-hacker-green/5 transition-all group overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-hacker-green group-hover:text-hacker-green-glow transition-colors text-base min-w-0">
              {post.title}
            </h3>
            <span className="text-hacker-green/40 text-xs shrink-0 whitespace-nowrap">{post.date}</span>
          </div>
          <p className="text-hacker-green/50 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-hacker-green/40">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Clock className="size-3" /> {post.readingTime} min
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Tag className="size-3" /> {post.category}
            </span>
            <div className="flex flex-wrap gap-1 min-w-0">
              {visibleTags.map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-hacker-green/10 border border-hacker-green/20 rounded text-hacker-green/60 truncate max-w-[7rem]">
                  {tag}
                </span>
              ))}
              {overflow > 0 && (
                <span className="px-1.5 py-0.5 bg-hacker-green/10 border border-hacker-green/20 rounded text-hacker-green/60">
                  +{overflow}
                </span>
              )}
            </div>
          </div>
        </Link>
      </Tilt3DCard>
    </motion.div>
  );
}
