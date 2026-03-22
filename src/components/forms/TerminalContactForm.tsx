import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

type FormStep = 'name' | 'email' | 'type' | 'message' | 'sending' | 'done';

const projectTypes = ['web-development', 'security', 'consultation'] as const;

/**
 * Terminal-styled interactive contact form where users
 * respond to sequential prompts like a CLI session
 */
export function TerminalContactForm() {
  const [step, setStep] = useState<FormStep>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState('');
  const [lines, setLines] = useState<{ text: string; type: 'system' | 'input' | 'error' | 'success' }[]>([
    { text: '$ contact --init', type: 'system' },
    { text: 'Initializing secure channel...', type: 'system' },
    { text: 'Connection established. Fill in the fields below.', type: 'system' },
    { text: '', type: 'system' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 'message') {
      textareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (text: string, type: 'system' | 'input' | 'error' | 'success') => {
    setLines(prev => [...prev, { text, type }]);
  };

  const handleSubmitStep = async () => {
    setError('');

    if (step === 'name') {
      if (currentInput.trim().length < 2) {
        setError('Name must be at least 2 characters');
        return;
      }
      setName(currentInput.trim());
      addLine(`> Name: ${currentInput.trim()}`, 'input');
      setCurrentInput('');
      setStep('email');
    } else if (step === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentInput.trim())) {
        setError('Please enter a valid email address');
        return;
      }
      setEmail(currentInput.trim());
      addLine(`> Email: ${currentInput.trim()}`, 'input');
      setCurrentInput('');
      setStep('type');
    } else if (step === 'type') {
      const idx = parseInt(currentInput.trim());
      if (isNaN(idx) || idx < 1 || idx > 3) {
        setError('Enter 1, 2, or 3');
        return;
      }
      const selected = projectTypes[idx - 1];
      setProjectType(selected);
      addLine(`> Project type: ${selected}`, 'input');
      setCurrentInput('');
      setStep('message');
    } else if (step === 'message') {
      if (currentInput.trim().length < 10) {
        setError('Message must be at least 10 characters');
        return;
      }
      setMessage(currentInput.trim());
      addLine(`> Message: ${currentInput.trim()}`, 'input');
      setCurrentInput('');
      setStep('sending');

      addLine('', 'system');
      addLine('Encrypting message...', 'system');

      try {
        const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
        if (!formspreeId) throw new Error('Form not configured');

        const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formspreeId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name || currentInput.trim(),
            email,
            projectType,
            message: currentInput.trim(),
            _subject: `New ${projectType} inquiry from ${name}`,
          }),
        });

        if (!response.ok) throw new Error('Send failed');

        addLine('Message transmitted successfully ✓', 'success');
        addLine('You will receive a response within 24-48 hours.', 'system');
        setStep('done');
      } catch {
        addLine('ERROR: Failed to transmit. Try again later.', 'error');
        setStep('done');
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

        {/* Current prompt */}
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
                    placeholder="Type your message..."
                    autoFocus
                  />
                  <button
                    onClick={handleSubmitStep}
                    className="self-end text-xs px-3 py-1 border border-hacker-green/30 rounded text-hacker-green/70 hover:bg-hacker-green/10 transition-colors"
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
