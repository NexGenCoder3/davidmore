import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { GlitchText } from "@/components/effects/GlitchText";

const commands = [
  { cmd: 'cd /', label: 'Go to homepage', path: '/' },
  { cmd: 'cd /portfolio', label: 'View projects', path: '/portfolio' },
  { cmd: 'cd /blog', label: 'Read articles', path: '/blog' },
  { cmd: 'cd /contact', label: 'Get in touch', path: '/contact' },
  { cmd: 'cd /skills', label: 'View skills', path: '/skills' },
];

/**
 * Hacker-themed 404 page with terminal-styled error output
 * and clickable navigation commands
 */
const NotFound = () => {
  return (
    <>
      <SEOHead
        title="404 — File Not Found"
        description="The page you're looking for doesn't exist in the filesystem."
      />
      
      <MatrixRain />

      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 relative z-10">
        <motion.div
          className="w-full max-w-2xl bg-black/80 border border-hacker-green/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.2)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-hacker-green/10 border-b border-hacker-green/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-amber" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-hacker-green/50">
              error@system:~
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 font-mono space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-hacker-green/60 text-sm"
            >
              <span className="text-hacker-green">$</span> cat /page/requested
            </motion.div>

            {/* 404 Glitch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <GlitchText
                text="ERROR 404"
                as="h1"
                glitchIntensity="high"
                className="text-5xl md:text-7xl font-bold text-destructive drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-hacker-green/70 text-base"
            >
              File not found in filesystem. The requested resource does not exist or has been relocated.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="h-px bg-hacker-green/20 origin-left"
            />

            {/* Suggested commands */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="space-y-1"
            >
              <p className="text-hacker-green/50 text-sm mb-3">Suggested commands:</p>
              {commands.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="group flex items-center gap-4 py-2 px-3 -mx-3 rounded hover:bg-hacker-green/5 transition-colors"
                  >
                    <code className="text-hacker-green font-bold text-sm min-w-[160px]">
                      {item.cmd}
                    </code>
                    <span className="text-hacker-green/50 text-sm group-hover:text-hacker-green/80 transition-colors">
                      # {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-hacker-green/40 text-sm pt-2"
            >
              <span className="text-hacker-green">$</span> <span className="animate-pulse">█</span>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
