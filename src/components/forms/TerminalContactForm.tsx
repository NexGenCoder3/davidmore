import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { GlassCard } from '@/components/ui/GlassCard';
import { useContactGuard } from '@/hooks/useContactGuard';

type FormStep = 'name' | 'email' | 'type' | 'message' | 'sending' | 'done';

const projectTypes = ['web-development', 'security', 'consultation'] as const;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

// Tighten user input — strip control chars, count URLs, prevent injection of weird unicode
const sanitize = (s: string) => s.replace(/[\u0000-\u001F\u007F]/g, '').trim();
const tooManyLinks = (s: string) => (s.match(/https?:\/\//gi) || []).length > 2;
const looksLikeSpamName = (s: string) => /https?:\/\/|www\.|<|>/i.test(s);

/**
 * Terminal-styled interactive contact form where users
 * respond to sequential prompts like a CLI session.
 *
 * Anti-abuse layers:
 *  - Honeypot input
 *  - Time trap (min 3s to fill)
 *  - Per-browser cooldown + daily cap (localStorage)
 *  - Cloudflare Turnstile (when VITE_TURNSTILE_SITE_KEY is set)
 *  - Stricter input validation (no URLs in names, link cap in messages)
 */
export function TerminalContactForm() {
  const [step, setStep] = useState<FormStep>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [, setMessage] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [lines, setLines] = useState<{ text: string; type: 'system' | 'input' | 'error' | 'success' }[]>([
    { text: '$ contact --init', type: 'system' },
    { text: 'Initializing secure channel...', type: 'system' },
    { text: 'Connection established. Fill in the fields below.', type: 'system' },
    { text: '', type: 'system' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const guard = useContactGuard();

  useEffect(() => {
    if (step === 'message') textareaRef.current?.focus();
    else inputRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  const addLine = (text: string, type: 'system' | 'input' | 'error' | 'success') => {
    setLines(prev => [...prev, { text, type }]);
  };

  const handleSubmitStep = async () => {
    setError('');
    const value = sanitize(currentInput);

    if (step === 'name') {
      if (value.length < 2) return setError('Name must be at least 2 characters');
      if (value.length > 100) return setError('Name must be less than 100 characters');
      if (looksLikeSpamName(value)) return setError('Please enter a real name (no links).');
      setName(value);
      addLine(`> Name: ${value}`, 'input');
      setCurrentInput('');
      setStep('email');
    } else if (step === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return setError('Please enter a valid email address');
      if (value.length > 255) return setError('Email must be less than 255 characters');
      setEmail(value);
      addLine(`> Email: ${value}`, 'input');
      setCurrentInput('');
      setStep('type');
    } else if (step === 'type') {
      const idx = parseInt(value);
      if (isNaN(idx) || idx < 1 || idx > 3) return setError('Enter 1, 2, or 3');
      const selected = projectTypes[idx - 1];
      setProjectType(selected);
      addLine(`> Project type: ${selected}`, 'input');
      setCurrentInput('');
      setStep('message');
    } else if (step === 'message') {
      if (value.length < 10) return setError('Message must be at least 10 characters');
      if (value.length > 1000) return setError('Message must be less than 1000 characters');
      if (tooManyLinks(value)) return setError('Too many links in message — please describe in plain text.');

      // Anti-abuse gates
      const verdict = guard.check();
      if (!verdict.ok) {
        if (verdict.reason === 'silent') {
          // Honeypot — fake success
          addLine('Message transmitted successfully ✓', 'success');
          setStep('done');
          return;
        }
        return setError(verdict.reason || 'Submission blocked.');
      }
      if (TURNSTILE_SITE_KEY && !turnstileToken) {
        return setError('Verifying you are human… please wait a moment and try again.');
      }

      setMessage(value);
      addLine(`> Message: ${value}`, 'input');
      setCurrentInput('');
      setStep('sending');
      addLine('', 'system');
      addLine('Encrypting message...', 'system');

      try {
        await emailjs.send(
          'service_sbquij3',
          'template_utkw7p8',
          {
            from_name: name,
            from_email: email,
            project_type: projectType,
            message: value,
            turnstile_token: turnstileToken || 'none',
          },
          'YiDqeN2Xbo5hv9gMv'
        );
        guard.recordSend();
        addLine('Message transmitted successfully ✓', 'success');
        addLine('You will receive a response within 24-48 hours.', 'system');
        setStep('done');
      } catch {
        addLine('ERROR: Failed to transmit. Try again later.', 'error');
        setStep('done');
      } finally {
        turnstileRef.current?.reset();
        setTurnstileToken('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 'message') {
      e.preventDefault();
      handleSubmitStep();
    }
  };

  const getPrompt = () => {
    switch (step) {
      case 'name': return 'Enter your name:';
      case 'email': return 'Enter your email:';
      case 'type': return 'Select project type (1: Web Dev, 2: Security, 3: Consultation):';
      case 'message': return 'Enter your message (Ctrl+Enter to send):';
      default: return '';
    }
  };

  return (
    <GlassCard className="w-full" hoverEffect={false}>
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-amber" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="flex-1 text-center text-xs font-mono text-hacker-green/50">
          secure-contact@david-more:~
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="p-4 md:p-6 font-mono text-sm space-y-1 max-h-[500px] overflow-y-auto"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'error' ? 'text-destructive' :
              line.type === 'success' ? 'text-hacker-green-glow' :
              line.type === 'input' ? 'text-hacker-green' :
              'text-hacker-green/60'
            }
          >
            {line.text}
          </div>
        ))}

        {/* Honeypot — must remain invisible to humans, present to bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website (leave blank)
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              onChange={(e) => guard.setHoneypot(e.target.value)}
            />
          </label>
        </div>

        {step !== 'sending' && step !== 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 space-y-2"
          >
            <div className="text-hacker-green/60">
              <span className="text-hacker-green">$</span> {getPrompt()}
            </div>
            {error && <div className="text-destructive text-xs">{error}</div>}
            <div className="flex items-start gap-2">
              <span className="text-hacker-green mt-1">{'>'}</span>
              {step === 'message' ? (
                <div className="flex-1 flex flex-col gap-2">
                  <textarea
                    ref={textareaRef}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        e.preventDefault();
                        handleSubmitStep();
                      }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-hacker-green caret-hacker-green-glow resize-none min-h-[80px] placeholder:text-hacker-green/30"
                    maxLength={1000}
                    placeholder="Type your message..."
                    autoFocus
                  />
                  {TURNSTILE_SITE_KEY && (
                    <div className="self-start">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={TURNSTILE_SITE_KEY}
                        options={{ size: 'flexible', theme: 'dark' }}
                        onSuccess={setTurnstileToken}
                        onError={() => setTurnstileToken('')}
                        onExpire={() => setTurnstileToken('')}
                      />
                    </div>
                  )}
                  <button
                    onClick={handleSubmitStep}
                    className="self-end text-xs px-4 py-1.5 rounded-full border border-hacker-green/30 text-hacker-green/80 hover:bg-hacker-green/10 hover:border-hacker-green/60 transition-all"
                  >
                    Send [Ctrl+Enter]
                  </button>
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type={step === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-hacker-green caret-hacker-green-glow placeholder:text-hacker-green/30"
                  maxLength={step === 'email' ? 255 : 100}
                  placeholder={step === 'type' ? '1, 2, or 3' : ''}
                  autoFocus
                />
              )}
            </div>
          </motion.div>
        )}

        {step === 'sending' && (
          <div className="text-hacker-green/60 animate-pulse">Processing...</div>
        )}
      </div>
    </GlassCard>
  );
}
