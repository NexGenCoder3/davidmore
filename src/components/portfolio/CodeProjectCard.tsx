import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface CodeProjectCardProps {
  project: Project;
  index?: number;
}

/**
 * Code-themed project card with syntax highlighting style
 * Mimics a code editor with line numbers and colored syntax
 */
export function CodeProjectCard({ project, index = 0 }: CodeProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Generate fake "code" lines based on project data
  const techString = project.tech || 'TypeScript';
  const techDisplay = techString.split(',').slice(0, 3).map(t => `"${t.trim()}"`).join(', ');
  const codeLines = [
    { type: 'comment', content: `// ${project.title}` },
    { type: 'keyword', content: 'const ', variable: 'project', operator: ' = {' },
    { type: 'property', indent: 1, key: 'name', value: `"${project.title}"` },
    { type: 'property', indent: 1, key: 'category', value: `"${project.category}"` },
    { type: 'property', indent: 1, key: 'year', value: project.year.toString() },
    { type: 'property', indent: 1, key: 'tech', value: `[${techDisplay}]` },
    { type: 'property', indent: 1, key: 'status', value: '"deployed"' },
    { type: 'closing', content: '};' },
    { type: 'empty', content: '' },
    { type: 'keyword', content: 'export default ', variable: 'project', operator: ';' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-lg border border-primary/30 bg-black/90 hover:border-primary/60 transition-all duration-300"
      >
        {/* Editor Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
          </div>
          <span className="flex-1 text-center text-xs font-mono text-primary/60 truncate">
            {project.slug}.tsx
          </span>
        </div>

        {/* Code Content */}
        <div className="relative">
          {/* Background Image (subtle) */}
          <div className="absolute inset-0 opacity-10">
            <img
              src={project.coverImage}
              alt=""
              className="w-full h-full object-cover"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          </div>

          {/* Code Lines */}
          <div className="relative p-4 font-mono text-sm space-y-1 min-h-[220px]">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                {/* Line Number */}
                <span className="w-8 text-right pr-4 text-primary/30 select-none text-xs">
                  {i + 1}
                </span>
                
                {/* Line Content */}
                <span className={cn('flex-1', line.indent && `pl-${line.indent * 4}`)}>
                  {line.type === 'comment' && (
                    <span className="text-primary/50 italic">{line.content}</span>
                  )}
                  {line.type === 'keyword' && (
                    <>
                      <span className="text-primary/70">{line.content}</span>
                      <span className="text-primary">{line.variable}</span>
                      <span className="text-primary/60">{line.operator}</span>
                    </>
                  )}
                  {line.type === 'property' && (
                    <span className="pl-4">
                      <span className="text-primary/80">{line.key}</span>
                      <span className="text-primary/60">: </span>
                      <span className={cn(
                        typeof line.value === 'string' && line.value.startsWith('"') 
                          ? 'text-primary' 
                          : line.value?.startsWith('[') 
                            ? 'text-primary/90'
                            : 'text-primary/70'
                      )}>
                        {line.value}
                      </span>
                      <span className="text-primary/60">,</span>
                    </span>
                  )}
                  {line.type === 'closing' && (
                    <span className="text-primary/60">{line.content}</span>
                  )}
                  {line.type === 'empty' && <span>&nbsp;</span>}
                </span>
              </motion.div>
            ))}

            {/* Blinking Cursor */}
            <motion.div
              className="flex items-center"
              animate={{ opacity: isHovered ? 1 : 0.5 }}
            >
              <span className="w-8 text-right pr-4 text-primary/30 select-none text-xs">
                {codeLines.length + 1}
              </span>
              <motion.span
                className="w-2 h-4 bg-primary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent flex items-end justify-center pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm font-mono">
              view_project()
            </span>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? '0 0 30px rgba(34, 197, 94, 0.3), inset 0 0 30px rgba(34, 197, 94, 0.1)'
              : '0 0 0px rgba(34, 197, 94, 0), inset 0 0 0px rgba(34, 197, 94, 0)'
          }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
}
