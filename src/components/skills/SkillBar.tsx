import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  proficiency: number;
  delay: number;
  onHover: () => void;
  onLeave: () => void;
}

export function SkillBar({ name, proficiency, delay, onHover, onLeave }: SkillBarProps) {
  const barWidth = 30;
  const filled = Math.round((proficiency / 100) * barWidth);
  const empty = barWidth - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  return (
    <motion.div
      className="font-mono text-sm flex items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span className="text-hacker-green/60 w-40 truncate group-hover:text-hacker-green transition-colors">
        {name}
      </span>
      <motion.span
        className="text-hacker-green"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        {bar}
      </motion.span>
      <span className="text-hacker-green-glow font-bold w-12 text-right">
        {proficiency}%
      </span>
    </motion.div>
  );
}
