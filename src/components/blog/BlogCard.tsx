import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types';
import { Clock, Tag } from 'lucide-react';

export function BlogCard({ post, delay }: { post: BlogPost; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block font-mono border border-hacker-green/20 rounded-lg p-5 hover:border-hacker-green/50 hover:bg-hacker-green/5 transition-all group"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-hacker-green group-hover:text-hacker-green-glow transition-colors text-base">
            {post.title}
          </h3>
          <span className="text-hacker-green/40 text-xs shrink-0">{post.date}</span>
        </div>
        <p className="text-hacker-green/50 text-sm mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-hacker-green/40">
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Tag className="size-3" /> {post.category}
          </span>
          <div className="flex gap-1">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 bg-hacker-green/10 border border-hacker-green/20 rounded text-hacker-green/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
