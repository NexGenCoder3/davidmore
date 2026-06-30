import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScene3DPreference } from './useScene3DPreference';

describe('useScene3DPreference', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to auto', () => {
    const { result } = renderHook(() => useScene3DPreference());
    expect(result.current.pref).toBe('auto');
  });

  it('cycles auto -> on -> off -> auto and persists', () => {
    const { result } = renderHook(() => useScene3DPreference());
    act(() => result.current.cycle());
    expect(result.current.pref).toBe('on');
    expect(localStorage.getItem('scene3d-pref')).toBe('on');
    act(() => result.current.cycle());
    expect(result.current.pref).toBe('off');
    act(() => result.current.cycle());
    expect(result.current.pref).toBe('auto');
  });

  it('off forces enabled false', () => {
    const { result } = renderHook(() => useScene3DPreference());
    act(() => result.current.set('off'));
    expect(result.current.enabled).toBe(false);
  });
});
