import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { skills, skillCategories } from '@/data/skills';
import { SkillCategory } from '@/components/skills/SkillCategory';
import type { SkillCategory as SkillCategoryType } from '@/types';

export default function Skills() {
  const grouped = skillCategories.map(cat => ({
    ...cat,
    skills: skills.filter(s => s.category === cat.name as SkillCategoryType),
  }));

  return (
    <>
      <SEOHead
        title="Skills & Tech Stack"
        description="Interactive visualization of technical skills across Frontend, Backend, Security, and DevOps."
      />

      <div className="min-h-screen bg-terminal-bg pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Terminal header */}
          <motion.div
            className="font-mono text-hacker-green mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-hacker-green/60 text-sm mb-2">
              <span className="text-hacker-green">$</span> cat skills.dat | sort --by=proficiency
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-hacker-green-glow drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              SKILL_MATRIX
            </h1>
            <div className="text-hacker-green/40 text-sm mt-2">
              ═══════════════════════════════════════════
            </div>
          </motion.div>

          {/* Skill categories */}
          <div className="space-y-10">
            {grouped.map((cat, i) => (
              <SkillCategory
                key={cat.name}
                title={cat.name}
                ascii={cat.ascii}
                skills={cat.skills}
                baseDelay={i * 0.3}
              />
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="font-mono text-hacker-green/30 text-sm mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-hacker-green/50">$</span> scan complete. {skills.length} skills indexed. <span className="animate-pulse">█</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
