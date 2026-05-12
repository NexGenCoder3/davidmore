import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { GlassCard } from '@/components/ui/GlassCard';

type FormStep = 'name' | 'email' | 'type' | 'message' | 'sending' | 'done';

const projectTypes = ['web-development', 'security', 'consultation'] as const;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

// Tighten user input — strip control chars, count URLs, prevent injection of weird unicode
const sanitize = (s: string) => s.replace(/[\u0000-\u001F\u007F]/g, '').trim();
const tooManyLinks = (s: string) => (s.match(/https?:\/\//gi) || []).length > 2;
const looksLikeSpamName = (s: string) => /https?:\/\/|www\.|<|>/i.test(s);

/**
 * Terminal-styled CLI-like contact form.
 *
 * Submits to /api/contact, which performs:
 *   - server-side Turnstile verification
 *   - Upstash Redis per-IP rate limiting
 *   - EmailJS dispatch with credentials held server-side
 *
 * Client-side defenses are UX only:
 *   - honeypot field
 *   - basic input shape checks
 *   - Turnstile widget gate before submit
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
  const [honeypot, setHoneypot] = useState('');
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

      // Honeypot — silent success
      if (honeypot.trim().length > 0) {
        addLine('Message transmitted successfully', 'success');
        setStep('done');
        return;
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
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            projectType,
            message: value,
            website: '',
            turnstileToken,
          }),
        });
        if (res.ok) {
          addLine('Message transmitted successfully', 'success');
          addLine('You will receive a response within 24-48 hours.', 'system');
          setStep('done');
        } else if (res.status === 429) {
          let serverMsg = 'Rate limited. Please try again later.';
          try {
            const data = (await res.json()) as { error?: string };
            if (data.error) serverMsg = data.error;
          } catch {
            // ignore
          }
          addLine(`ERROR: ${serverMsg}`, 'error');
          setStep('done');
        } else {
          addLine('ERROR: Failed to transmit. Try again later.', 'error');
          setStep('done');
        }
      } catch {
        addLine('ERROR: Network failure. Try again later.', 'error');
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
            role={line.type === 'error' ? 'alert' : undefined}
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
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
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
            {error && (
              <div className="text-destructive text-xs" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-hacker-green mt-1">{'>'}</span>
              {step === 'message' ? (
                <div className="flex-1 flex flex-col gap-3">
                  <textarea
                    ref={textareaRef}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      // Ctrl/Cmd+Enter always sends (desktop power users).
                      // On touch devices, plain Enter also sends; Shift+Enter inserts newline.
                      const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        handleSubmitStep();
                      } else if (e.key === 'Enter' && !e.shiftKey && isTouch) {
                        e.preventDefault();
                        handleSubmitStep();
                      }
                    }}
                    enterKeyHint="send"
                    className="flex-1 bg-transparent border-none outline-none text-hacker-green caret-hacker-green-glow resize-none min-h-[96px] placeholder:text-hacker-green/30 text-base"
                    maxLength={1000}
                    placeholder="Type your message..."
                    aria-label="Message"
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
                    type="button"
                    onClick={handleSubmitStep}
                    className="w-full sm:w-auto sm:self-end h-11 px-6 rounded-full bg-hacker-green text-black font-semibold tracking-tight shadow-[0_0_0_1px_hsl(142_70%_45%/0.6),0_10px_28px_-8px_hsl(142_70%_45%/0.55)] hover:shadow-[0_0_32px_hsl(142_90%_55%/0.6)] hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    Send message
                  </button>
                  <p className="text-[10px] text-hacker-green/40 text-right hidden sm:block">↵ to send · Shift+↵ for newline</p>
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type={step === 'email' ? 'email' : step === 'type' ? 'tel' : 'text'}
                  inputMode={step === 'email' ? 'email' : step === 'type' ? 'numeric' : 'text'}
                  enterKeyHint={step === 'message' ? 'send' : 'next'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-hacker-green caret-hacker-green-glow placeholder:text-hacker-green/30 text-base"
                  maxLength={step === 'email' ? 255 : 100}
                  placeholder={step === 'type' ? '1, 2, or 3' : ''}
                  aria-label={getPrompt()}
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
