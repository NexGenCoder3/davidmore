import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { developerInfo } from '@/data/developer';

const ROUTES: Record<string, string> = {
  home: '/',
  portfolio: '/portfolio',
  about: '/about',
  contact: '/contact',
  skills: '/skills',
  blog: '/blog',
  resume: '/resume',
};

const COMMANDS = ['cd', 'ls', 'help', 'whoami', 'clear', 'neofetch', 'history', 'cat', 'ping', 'sudo'];

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
    '  █  █  ████  █  █  █     Shell: CommandTerminal v1.0',
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
    '  cd <page>      Navigate to a page (home, about, portfolio, skills, blog, resume, contact)',
    '  cd ~ | cd /    Navigate to home',
    '  ls             List available pages',
    '  whoami         Display developer info',
    '  neofetch       System info display',
    '  cat about.txt  Show bio snippet',
    '  ping           Ping the server',
    '  sudo admin     Access admin dashboard',
    '  history        Show command history',
    '  clear          Clear terminal',
    '  help           Show this help message',
    '',
    '  Press ` or Ctrl+K to toggle terminal',
    '  Press Escape to close',
  ];
}

export function CommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentDir = location.pathname === '/' ? '~' : location.pathname.slice(1);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').replace(/^\//, '');

    let output: string[] = [];

    switch (command) {
      case 'cd': {
        const target = args.toLowerCase();
        if (!target || target === '~' || target === '/' || target === 'home') {
          navigate('/');
          output = ['Navigating to ~/home...'];
        } else if (ROUTES[target]) {
          navigate(ROUTES[target]);
          output = [`Navigating to ~/${target}...`];
        } else {
          output = [`bash: cd: ${args}: No such directory`];
        }
        break;
      }
      case 'ls':
        output = ['Available pages:', '', ...Object.keys(ROUTES).map(r => `  📁 ${r}`)];
        break;
      case 'help':
        output = getHelp();
        break;
      case 'whoami':
        output = [
          `${developerInfo.name}`,
          `${developerInfo.tagline}`,
          `📍 ${developerInfo.location}`,
          `📧 ${developerInfo.email}`,
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'neofetch':
        output = getNeofetch();
        break;
      case 'history':
        output = cmdHistory.length
          ? cmdHistory.map((c, i) => `  ${i + 1}  ${c}`)
          : ['No commands in history.'];
        break;
      case 'cat':
        if (args.toLowerCase() === 'about.txt') {
          output = [
            developerInfo.biography.split('\n')[0].slice(0, 200) + '...',
            '',
            'Run "cd about" for full details.',
          ];
        } else {
          output = [`cat: ${args || '???'}: No such file`];
        }
        break;
      case 'ping':
        output = [`PING lovable.app (127.0.0.1): 56 bytes`, `64 bytes: time=${(Math.random() * 2).toFixed(2)}ms`, `--- ping complete ---`];
        break;
      case 'sudo':
        if (args.toLowerCase() === 'admin') {
          navigate('/admin');
          output = ['[sudo] Access granted. Loading admin dashboard...'];
        } else {
          output = ['[sudo] Unknown command. Try: sudo admin'];
        }
        break;
      default:
        output = [`bash: ${command}: command not found. Type "help" for available commands.`];
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
  }, [navigate, cmdHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
      const match = COMMANDS.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }, [input, executeCommand, cmdHistory, historyIndex]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
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
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 p-3 rounded-lg bg-terminal-bg border border-hacker-green/30 text-hacker-green hover:text-hacker-green-glow hover:border-hacker-green/60 transition-all shadow-lg"
        aria-label="Open command terminal"
      >
        <Terminal className="size-5 animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-28 md:inset-x-auto md:bottom-28 md:right-6 md:w-[600px] z-50 rounded-lg border border-hacker-green/30 bg-terminal-bg shadow-2xl overflow-hidden font-mono text-sm"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-hacker-green/10 border-b border-hacker-green/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-hacker-green/70 text-xs ml-2">guest@dm-portfolio:~/{currentDir}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-hacker-green/50 hover:text-hacker-green text-xs">
                [ESC]
              </button>
            </div>

            {/* Terminal body */}
            <div ref={scrollRef} className="p-4 max-h-80 overflow-y-auto hide-scrollbar">
              {/* Welcome message */}
              {history.length === 0 && (
                <div className="text-hacker-green/60 mb-2">
                  <p>Welcome to DM Terminal v1.0</p>
                  <p>Type "help" for available commands.</p>
                  <p className="mt-1 text-hacker-green/40">Press ` or Ctrl+K to toggle • Escape to close</p>
                </div>
              )}

              {/* History */}
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  <div className="text-hacker-green">
                    <span className="text-hacker-green/60">guest@dm</span>
                    <span className="text-hacker-green/40">:</span>
                    <span className="text-blue-400">~/{currentDir}</span>
                    <span className="text-hacker-green/40">$ </span>
                    {entry.command}
                  </div>
                  {entry.output.map((line, j) => (
                    <div key={j} className="text-hacker-green/80 whitespace-pre">
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
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-hacker-green caret-hacker-green ml-1"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
