import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';

function setMatchMedia(matches: (q: string) => boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: matches(query),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    }),
  });
}

describe('CustomCursor', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('has-custom-cursor');
  });

  it('does not render on touch devices', () => {
    setMatchMedia((q) => q.includes('coarse'));
    const { container } = render(<CustomCursor />);
    expect(container.querySelector('[data-testid="custom-cursor-ring"]')).toBeNull();
  });

  it('does not render under reduced motion', () => {
    setMatchMedia((q) => q.includes('reduced-motion'));
    const { container } = render(<CustomCursor />);
    expect(container.querySelector('[data-testid="custom-cursor-ring"]')).toBeNull();
  });

  it('renders on desktop and switches modes', () => {
    setMatchMedia(() => false);
    render(
      <>
        <CustomCursor />
        <a href="#x">link</a>
        <input data-testid="i" />
      </>,
    );
    const ring = screen.getByTestId('custom-cursor-ring');
    expect(ring).toBeInTheDocument();
    expect(ring.dataset.mode).toBe('default');

    fireEvent.mouseOver(screen.getByText('link'));
    expect(ring.dataset.mode).toBe('pointer');

    fireEvent.mouseOver(screen.getByTestId('i'));
    expect(ring.dataset.mode).toBe('text');
  });

  it('disables when preference is off', () => {
    setMatchMedia(() => false);
    localStorage.setItem('custom-cursor', 'off');
    const { container } = render(<CustomCursor />);
    expect(container.querySelector('[data-testid="custom-cursor-ring"]')).toBeNull();
  });
});
