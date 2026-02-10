import { motion } from 'framer-motion';

const asciiArt = [
  '██████╗  ███╗   ███╗',
  '██╔══██╗ ████╗ ████║',
  '██║  ██║ ██╔████╔██║',
  '██║  ██║ ██║╚██╔╝██║',
  '██████╔╝ ██║ ╚═╝ ██║',
  '╚═════╝  ╚═╝     ╚═╝',
];

/**
 * Animated ASCII art logo for David More
 * Green terminal-style monospace characters with glow
 */
export function AsciiLogo() {
  return (
    <motion.div
      className="font-mono leading-none select-none cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      <pre className="text-[6px] sm:text-[7px] md:text-[8px] text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)] tracking-tight">
        {asciiArt.map((line, i) => (
          <motion.span
            key={i}
            className="block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        ))}
      </pre>
    </motion.div>
  );
}
