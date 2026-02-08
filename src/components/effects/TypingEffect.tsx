import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

/**
 * Terminal-style typing animation effect
 * Simulates text being typed character by character
 */
export function TypingEffect({
  text,
  className = '',
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
          animate={{ opacity: showCursorState ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </span>
  );
}

interface TerminalTextProps {
  lines: string[];
  className?: string;
  lineDelay?: number;
  typeSpeed?: number;
}

/**
 * Multi-line terminal text with sequential typing
 */
export function TerminalText({
  lines,
  className = '',
  lineDelay = 500,
  typeSpeed = 30,
}: TerminalTextProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    setCompletedLines((prev) => [...prev, lines[currentLine]]);
    if (currentLine < lines.length - 1) {
      setTimeout(() => setCurrentLine((prev) => prev + 1), lineDelay);
    }
  };

  return (
    <div className={`font-mono text-sm ${className}`}>
      {completedLines.map((line, index) => (
        <div key={index} className="text-primary/80">
          <span className="text-primary mr-2">$</span>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="text-primary">
          <span className="text-primary mr-2">$</span>
          <TypingEffect
            text={lines[currentLine]}
            speed={typeSpeed}
            onComplete={handleLineComplete}
          />
        </div>
      )}
    </div>
  );
}
