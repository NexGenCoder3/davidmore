import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCursorPreference } from './useCursorPreference';

describe('useCursorPreference', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to on', () => {
    const { result } = renderHook(() => useCursorPreference());
    expect(result.current.pref).toBe('on');
    expect(result.current.enabled).toBe(true);
  });

  it('toggles and persists', () => {
    const { result } = renderHook(() => useCursorPreference());
    act(() => result.current.toggle());
    expect(result.current.pref).toBe('off');
    expect(localStorage.getItem('custom-cursor')).toBe('off');
    act(() => result.current.toggle());
    expect(result.current.pref).toBe('on');
  });
});
