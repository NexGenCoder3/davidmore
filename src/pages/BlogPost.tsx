import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { getBlogPostBySlug } from '@/data/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  // Simple markdown-to-JSX renderer for code blocks and headers
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLang = '';

    lines.forEach((line, i) => {
      if (line.startsWith('```') && !inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
        return;
      }
      if (line.startsWith('```') && inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <pre key={i} className="bg-terminal-bg border border-hacker-green/20 rounded-lg p-4 overflow-x-auto my-4 text-sm">
            <code className="text-hacker-green/80">{codeLines.join('\n')}</code>
          </pre>
        );
        return;
      }
      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-hacker-green-glow text-lg font-bold mt-6 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-hacker-green-glow text-xl font-bold mt-8 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith('- [ ] ')) {
        elements.push(<div key={i} className="flex items-center gap-2 text-hacker-green/70 text-sm"><span className="text-hacker-green/40">☐</span>{line.slice(6)}</div>);
      } else if (line.startsWith('- ')) {
        elements.push(<div key={i} className="flex items-start gap-2 text-hacker-green/70 text-sm ml-2"><span className="text-hacker-green/50">•</span>{line.slice(2)}</div>);
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(<p key={i} className="text-hacker-green/70 text-sm leading-relaxed">{line}</p>);
      }
    });

    return elements;
  };

  return (
    <>
      <SEOHead title={post.title} description={post.excerpt} type="article" />

      <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-hacker-green/50 hover:text-hacker-green transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> cd ../blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono mb-8">
              <h1 className="text-2xl md:text-3xl text-hacker-green-glow font-bold mb-3">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-hacker-green/40">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readingTime} min</span>
                <span className="flex items-center gap-1"><Tag className="size-3" /> {post.category}</span>
              </div>
              <div className="flex gap-1 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-hacker-green/10 border border-hacker-green/20 rounded text-hacker-green/60 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-mono border-t border-hacker-green/20 pt-8">
              {renderContent(post.content)}
            </div>
          </motion.article>
        </div>
      </div>
    </>
  );
}
