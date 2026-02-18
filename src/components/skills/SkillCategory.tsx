import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from '@/types';
import { SkillBar } from './SkillBar';

interface SkillCategoryProps {
  title: string;
  ascii: string;
  skills: Skill[];
  baseDelay: number;
}

export function SkillCategory({ title, ascii, skills, baseDelay }: SkillCategoryProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: baseDelay }}
    >
      <div className="font-mono text-hacker-green-glow text-sm tracking-wider">
        {ascii}
      </div>

      <div className="space-y-2 pl-2">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            proficiency={skill.proficiency}
            delay={baseDelay + i * 0.08}
            onHover={() => setHoveredSkill(skill)}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
      </div>

      <AnimatePresence>
        {hoveredSkill && hoveredSkill.relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-xs text-hacker-green/50 pl-2"
          >
            └── Used in: {hoveredSkill.relatedProjects.join(', ')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
