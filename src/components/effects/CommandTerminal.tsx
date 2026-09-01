import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

/** Every real route in the app — keep in sync with App.tsx */
const ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  skills: '/skills',
  blog: '/blog',
  resume: '/resume',
  contact: '/contact',
  accessibility: '/accessibility',
};

const COMMANDS = [
  'cd',
  'ls',
  'open',
  'help',
  'man',
  'whoami',
  'clear',
  'neofetch',
  'history',
  'cat',
  'echo',
  'pwd',
  'date',
  'email',
  'projects',
  'posts',
  'ping',
  'sudo',
  'exit',
];

interface HistoryEntry {
  command: string;
  output: string[];
}

function getNeofetch() {
  return [
    '        ▄▄▄▄▄▄▄▄▄▄▄        dm@portfolio',
    '       █           █       ──────────────',
    '      █  ▀▀▀▀▀▀▀▀  █      OS: HackerOS 4.2.0',
    '     █  █        █  █      Host: React 18.3',
    '    █  █  ▀▀▀▀  █  █      Kernel: Vite 6.x',
    '   █  █  █    █  █  █     Uptime: since page load',
    '  █  █  ████  █  █  █     Shell: CommandTerminal v2.0',
    ' █  █          █  █  █    Theme: Hacker Green [Dark]',
    '█  ██████████████  █  █   Terminal: 80x24',
    '█                   █ █   CPU: TypeScript @ 100%',
    ' ███████████████████  █   Memory: Efficient',
    '                     ██',
  ];
}

function getHelp() {
  return [
    'Available commands:',
    '',
    '  cd <page>       Navigate (home, about, portfolio, skills, blog, resume, contact, accessibility)',
    '  cd ~ | cd /     Navigate to home',
    '  cd ..           Go back one level',
    '  ls              List available pages',
    '  projects        List portfolio projects (cd project <n>)',
    '  posts           List blog posts (cd post <n>)',
    '  open <target>   Open github | linkedin | email in a new tab',
    '  whoami          Display developer info',
    '  email           Show contact email and open mail client',
    '  neofetch        System info display',
    '  cat about.txt   Show bio snippet',
    '  echo <text>     Print text',
    '  pwd             Print current route',
    '  date            Show current date/time',
    '  ping            Ping the server',
    '  man <cmd>       Manual page for a command',
    '  history         Show command history',
    '  clear           Clear terminal',
    '  exit            Close the terminal',
    '  help            Show this message',
    '',
    '  Press ` or Ctrl+K to toggle • Tab to autocomplete • Escape to close',
  ];
}

const MANUALS: Record<string, string[]> = {
  cd: ['cd — change directory (navigate the site).', 'Usage: cd <page> | cd ~ | cd .. | cd project <n> | cd post <n>'],
  ls: ['ls — list navigable pages.', 'Usage: ls'],
  open: ['open — open an external profile or the mail client.', 'Usage: open github | linkedin | email'],
  cat: ['cat — print a file.', 'Usage: cat about.txt'],
  echo: ['echo — print text back to the terminal.', 'Usage: echo <text>'],
  sudo: ['sudo — execute as superuser. Mostly jokes.', 'Usage: sudo <command>'],
};

export function CommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentDir = location.pathname === '/' ? '~' : location.pathname.slice(1);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const rawArgs = parts.slice(1).join(' ');
      const args = rawArgs.replace(/^\//, '');

      let output: string[] = [];

      switch (command) {
        case 'cd': {
          const [first, second] = args.toLowerCase().split(/\s+/);
          if (!first || first === '~' || first === '/' || first === 'home') {
            navigate('/');
            output = ['Navigating to ~/home...'];
          } else if (first === '..') {
            navigate(-1);
            output = ['Going back...'];
          } else if (first === 'project' || first === 'projects') {
            const idx = Number(second);
            const project = projects[idx - 1];
            if (project) {
              navigate(`/project/${project.slug}`);
              output = [`Opening project: ${project.title}`];
            } else {
              navigate('/portfolio');
              output = ['Usage: cd project <n> — run "projects" to list them.'];
            }
          } else if (first === 'post' || first === 'posts') {
            const idx = Number(second);
            const post = blogPosts[idx - 1];
            if (post) {
              navigate(`/blog/${post.slug}`);
              output = [`Opening post: ${post.title}`];
            } else {
              navigate('/blog');
              output = ['Usage: cd post <n> — run "posts" to list them.'];
            }
          } else if (ROUTES[first]) {
            navigate(ROUTES[first]);
            output = [`Navigating to ~/${first}...`];
          } else {
            output = [`bash: cd: ${args}: No such directory`, 'Run "ls" to see available pages.'];
          }
          break;
        }
        case 'ls':
          output = ['Available pages:', '', ...Object.keys(ROUTES).map((r) => `  📁 ${r}`)];
          break;
        case 'projects':
          output = projects.length
            ? ['Portfolio projects:', '', ...projects.map((p, i) => `  ${i + 1}. ${p.title}`), '', 'Open one with: cd project <n>']
            : ['No projects found.'];
          break;
        case 'posts':
          output = blogPosts.length
            ? ['Blog posts:', '', ...blogPosts.map((p, i) => `  ${i + 1}. ${p.title}`), '', 'Open one with: cd post <n>']
            : ['No posts found.'];
          break;
        case 'open': {
          const target = args.toLowerCase();
          const links: Record<string, string | undefined> = {
            github: developerInfo.socialLinks?.github,
            linkedin: developerInfo.socialLinks?.linkedin,
            email: `mailto:${developerInfo.email}`,
          };
          const url = links[target];
          if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
            output = [`Opening ${target}...`];
          } else {
            output = ['Usage: open github | linkedin | email'];
          }
          break;
        }
        case 'help':
          output = getHelp();
          break;
        case 'man': {
          const page = MANUALS[args.toLowerCase()];
          output = page ?? [`No manual entry for ${args || '???'}`, 'Try: man cd'];
          break;
        }
        case 'whoami':
          output = [
            `${developerInfo.name}`,
            `${developerInfo.tagline}`,
            `📍 ${developerInfo.location}`,
            `📧 ${developerInfo.email}`,
          ];
          break;
        case 'email':
          window.open(`mailto:${developerInfo.email}`, '_self');
          output = [`${developerInfo.email}`, 'Opening your mail client...'];
          break;
        case 'echo':
          output = [rawArgs];
          break;
        case 'pwd':
          output = [`~${location.pathname}`];
          break;
        case 'date':
          output = [new Date().toString()];
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'exit':
          setIsOpen(false);
          return;
        case 'neofetch':
          output = getNeofetch();
          break;
        case 'history':
          output = cmdHistory.length ? cmdHistory.map((c, i) => `  ${i + 1}  ${c}`) : ['No commands in history.'];
          break;
        case 'cat':
          if (args.toLowerCase() === 'about.txt') {
            output = [
              developerInfo.biography.split('\n')[0].slice(0, 200) + '...',
              '',
              'Run "cd about" for full details.',
            ];
          } else {
            output = [`cat: ${args || '???'}: No such file`, 'Try: cat about.txt'];
          }
          break;
        case 'ping':
          output = [
            `PING ${window.location.host} (127.0.0.1): 56 bytes`,
            `64 bytes: time=${(Math.random() * 2).toFixed(2)}ms`,
            '--- ping complete ---',
          ];
          break;
        case 'sudo': {
          const sudoArgs = args.toLowerCase();
          if (sudoArgs === 'reboot') {
            output = [
              '[sudo] Initiating system reboot...',
              'Stopping services... ██████████ 100%',
              'Flushing cache... done.',
              'Rebooting in 3... 2... 1...',
              '',
              "⚡ Just kidding. This is a website. We don't reboot.",
            ];
          } else if (sudoArgs === 'shutdown' || sudoArgs === 'poweroff') {
            output = [
              '[sudo] Broadcast message from root@dm-portfolio:',
              '',
              '  The system is going down for maintenance NOW!',
              "  ...wait, you can't shut down a portfolio site.",
              '  Nice try though. 😎',
            ];
          } else if (sudoArgs === 'rm -rf /' || sudoArgs === 'rm -rf /*') {
            output = ['[sudo] rm: refusing to obliterate portfolio', 'ERROR: Cannot delete. Too much talent stored here. 🔥'];
          } else if (sudoArgs === 'make me a sandwich') {
            output = ['🥪 Okay.'];
          } else if (sudoArgs === 'hire' || sudoArgs === 'hire me') {
            navigate('/contact');
            output = ['[sudo] Access granted. Opening the contact channel...'];
          } else if (sudoArgs === 'hack' || sudoArgs === 'hack nasa') {
            output = [
              '[sudo] Connecting to mainframe...',
              'ACCESS DENIED. FBI has been notified.',
              '',
              "...just kidding. But seriously, don't hack NASA.",
            ];
          } else {
            output = [
              '[sudo] Usage: sudo <command>',
              '',
              '  sudo hire               Jump straight to the contact page',
              '  sudo reboot             Reboot the system',
              '  sudo shutdown           Shut it all down',
              '  sudo rm -rf /           Live dangerously',
              '  sudo make me a sandwich You know the meme',
              '  sudo hack               Try your luck',
            ];
          }
          break;
        }
        default:
          output = [`bash: ${command}: command not found. Type "help" for available commands.`];
      }

      setHistory((prev) => [...prev, { command: trimmed, output }]);
    },
    [navigate, cmdHistory, location.pathname],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        executeCommand(input);
        setInput('');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length > 0) {
          const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const value = input.toLowerCase();
        const [head, ...rest] = value.split(/\s+/);
        if (rest.length === 0) {
          const match = COMMANDS.find((c) => c.startsWith(head));
          if (match) setInput(match);
        } else if (head === 'cd') {
          const match = Object.keys(ROUTES).find((r) => r.startsWith(rest.join(' ')));
          if (match) setInput(`cd ${match}`);
        } else if (head === 'open') {
          const match = ['github', 'linkedin', 'email'].find((r) => r.startsWith(rest.join(' ')));
          if (match) setInput(`open ${match}`);
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setHistory([]);
      }
    },
    [input, executeCommand, cmdHistory, historyIndex],
  );

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (e.key === '`' && (!typing || isOpen)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Close on outside click / tap
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        const toggle = (target as HTMLElement)?.closest?.('[data-terminal-toggle]');
        if (!toggle) setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      {/* Terminal toggle button */}
      <button
        type="button"
        data-terminal-toggle
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-28 right-3 sm:bottom-20 sm:right-6 z-[60] min-h-11 min-w-11 flex items-center justify-center rounded-2xl bg-terminal-bg/90 backdrop-blur-md border border-hacker-green/30 text-hacker-green hover:text-hacker-green-glow hover:border-hacker-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hacker-green/60 transition-all shadow-lg"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label={isOpen ? 'Close command terminal' : 'Open command terminal'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Terminal className="size-5 animate-pulse" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Command terminal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-44 sm:bottom-36 md:inset-x-auto md:right-6 md:w-[600px] z-50 rounded-lg border border-hacker-green/30 bg-terminal-bg shadow-2xl overflow-hidden font-mono text-sm"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-hacker-green/10 border-b border-hacker-green/20">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-hacker-green/70 text-xs ml-2 truncate">guest@dm-portfolio:~/{currentDir}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close terminal"
                className="text-hacker-green/60 hover:text-hacker-green text-xs px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hacker-green/60"
              >
                [ESC]
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="p-4 max-h-[45vh] md:max-h-80 overflow-y-auto hide-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              {history.length === 0 && (
                <div className="text-hacker-green/60 mb-2">
                  <p>Welcome to DM Terminal v2.0</p>
                  <p>Type "help" for available commands.</p>
                  <p className="mt-1 text-hacker-green/40">Press ` or Ctrl+K to toggle • Tab to autocomplete • Escape to close</p>
                </div>
              )}

              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  <div className="text-hacker-green break-all">
                    <span className="text-hacker-green/60">guest@dm</span>
                    <span className="text-hacker-green/40">:</span>
                    <span className="text-blue-400">~/{currentDir}</span>
                    <span className="text-hacker-green/40">$ </span>
                    {entry.command}
                  </div>
                  {entry.output.map((line, j) => (
                    <div key={j} className="text-hacker-green/80 whitespace-pre-wrap break-words">
                      {line}
                    </div>
                  ))}
                </div>
              ))}

              {/* Input */}
              <div className="flex items-center text-hacker-green">
                <span className="text-hacker-green/60">guest@dm</span>
                <span className="text-hacker-green/40">:</span>
                <span className="text-blue-400">~/{currentDir}</span>
                <span className="text-hacker-green/40">$ </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Terminal command input"
                  className="flex-1 min-w-0 bg-transparent outline-none text-hacker-green caret-hacker-green ml-1"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
