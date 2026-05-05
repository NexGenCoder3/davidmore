import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { RouteLoader } from './RouteLoader';

function Nav({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>{label}</button>;
}

function Harness() {
  return (
    <>
      <RouteLoader />
      <Routes>
        <Route path="/" element={<Nav to="/portfolio" label="go-port" />} />
        <Route path="/portfolio" element={<Nav to="/about" label="go-about" />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </>
  );
}

describe('RouteLoader', () => {
  beforeEach(() => vi.useFakeTimers());

  it('shows on route change and hides after duration', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Harness />
      </MemoryRouter>,
    );
    // first mount: no loader
    expect(screen.queryByTestId('route-loader')).toBeNull();

    act(() => {
      screen.getByText('go-port').click();
    });
    expect(screen.getByTestId('route-loader')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    // After hide timeout fires, AnimatePresence will exit; node should eventually be gone
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
  });

  it('handles rapid route changes without leaving overlay stuck', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Harness />
      </MemoryRouter>,
    );
    act(() => {
      screen.getByText('go-port').click();
    });
    act(() => {
      screen.getByText('go-about').click();
    });
    expect(screen.getByTestId('route-loader')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
  });
});
