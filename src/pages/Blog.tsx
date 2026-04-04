import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { blogPosts, getBlogPostsByCategory } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { TypingEffect } from '@/components/effects/TypingEffect';

const categories = ['all', 'Security', 'Web Dev', 'DevOps', 'Tutorials'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = getBlogPostsByCategory(activeCategory).filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEOHead
        title="Blog & Write-ups"
        description="Technical articles on security, web development, DevOps, and tutorials."
      />

      <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="font-mono text-hacker-green mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-hacker-green/60 text-sm mb-2">
              <span className="text-hacker-green">$</span> ls ~/blog/
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-hacker-green-glow drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              <TypingEffect text="WRITE_UPS" speed={60} showCursor={false} />
            </h1>
          </motion.div>

          {/* Search */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center font-mono text-sm border border-hacker-green/30 rounded bg-terminal-bg px-3 py-2 w-full">
              <span className="text-hacker-green/60 mr-2 shrink-0">grep</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="search articles..."
                className="bg-transparent flex-1 min-w-0 outline-none text-hacker-green placeholder:text-hacker-green/30"
              />
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="flex gap-2 mb-8 font-mono text-sm overflow-x-auto hide-scrollbar pb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 border rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'border-hacker-green text-hacker-green bg-hacker-green/10'
                    : 'border-hacker-green/20 text-hacker-green/50 hover:border-hacker-green/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Articles */}
          <div className="space-y-4">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} delay={0.3 + i * 0.1} />
            ))}
            {filtered.length === 0 && (
              <div className="font-mono text-hacker-green/40 text-sm py-8 text-center">
                No articles found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
