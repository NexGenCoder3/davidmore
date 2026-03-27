import { Instagram, Linkedin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { developerInfo } from '@/data/developer';
import { MagneticButton } from '@/components/effects/MagneticButton';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDir = location.pathname === '/' ? '~' : `~${location.pathname}`;

  return (
    <footer className="border-t border-border">
      {/* Terminal Status Bar */}
      <div className="bg-terminal-bg border-b border-hacker-green/20 px-6 lg:px-8 py-2 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 text-hacker-green/70">
            <span className="text-hacker-green/50">guest@dm:</span>
            <span>{currentDir}</span>
          </div>
          <div className="flex items-center gap-6 text-hacker-green/50">
            <span>⏱ uptime: {formatUptime(uptime)}</span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-hacker-green animate-pulse" />
              SECURE
            </span>
          </div>
        </div>
      </div>

      {/* Original footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {developerInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {developerInfo.socialLinks.github && (
              <MagneticButton strength={0.25}>
                <a
                  href={developerInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="size-5" />
                </a>
              </MagneticButton>
            )}
            {developerInfo.socialLinks.linkedin && (
              <MagneticButton strength={0.25}>
                <a
                  href={developerInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
