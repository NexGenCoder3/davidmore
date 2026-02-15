
# Command-Line Navigation + More Hacker Features

## Overview
Add an interactive command-line terminal overlay (toggled with backtick or Ctrl+K) that lets visitors type shell-like commands to navigate the site, plus several additional hacker-themed enhancements.

---

## Feature 1: Command Terminal Navigation

A floating terminal prompt that accepts commands like a real shell.

**Supported commands:**
- `cd portfolio` / `cd /portfolio` - navigate to Portfolio page
- `cd about` - navigate to About page  
- `cd contact` - navigate to Contact page
- `cd ~` / `cd /` / `cd home` - navigate to Home
- `ls` - list available pages/routes
- `help` - show all commands
- `whoami` - display developer info
- `clear` - clear terminal history
- `neofetch` - show a stylized system info display
- `history` - show command history
- `cat about.txt` - show a quick bio snippet
- `ping` - fun response ("pong! 0.42ms")

**Implementation:**
- Create `src/components/effects/CommandTerminal.tsx` - full terminal UI with input, scrollable history, and command parser
- Uses `useNavigate()` from react-router-dom for navigation commands
- Toggled via backtick key or a small terminal icon in the corner
- Appears as a modal overlay with the same green-on-black terminal styling
- Command history accessible with up/down arrow keys
- Auto-complete with Tab key for known commands

**Integration:**
- Add to `Layout.tsx` so it's available on all pages
- Add a small pulsing terminal icon in bottom-right corner as a hint

---

## Feature 2: Hacker Cursor Trail

- Create `src/components/effects/CursorTrail.tsx` - green glowing particles that follow the mouse cursor
- Uses canvas rendering for performance
- Particles fade out with a phosphor-green glow effect
- Add to `Layout.tsx`

---

## Feature 3: Konami Code Easter Egg

- Create `src/hooks/useKonamiCode.ts` - detects the classic Konami code sequence
- When triggered, temporarily intensifies the matrix rain and shows a secret message like "ACCESS LEVEL: ROOT"
- Subtle and fun discovery for visitors

---

## Feature 4: Status Bar Footer

- Update `Footer.tsx` to include a terminal-style status bar showing:
  - Current "directory" (page path)
  - "Uptime" (time since page load)
  - Connection status indicator (green dot + "SECURE")

---

## Technical Details

### New Files
1. `src/components/effects/CommandTerminal.tsx` - Terminal overlay with command parsing, history, and navigation
2. `src/components/effects/CursorTrail.tsx` - Canvas-based mouse trail effect  
3. `src/hooks/useKonamiCode.ts` - Konami code detection hook

### Modified Files
1. `src/components/layout/Layout.tsx` - Add CommandTerminal and CursorTrail
2. `src/components/layout/Footer.tsx` - Add terminal status bar with path, uptime, and connection indicator

### Dependencies
No new dependencies needed. Uses existing framer-motion, react-router-dom, and native Canvas API.

### Keyboard Shortcuts
- Backtick (`) or Ctrl+K: Toggle command terminal
- Escape: Close terminal
- Up/Down arrows: Navigate command history (when terminal open)
- Tab: Auto-complete commands (when terminal open)
