# AI Agent Instructions for GSAP Awwwards Website Template

This file provides guidance for AI coding agents customizing this Vite + React + GSAP template.

## Quick Start

1. **App Entry**: Edit main application files
2. **Animations**: GSAP is used for animations
3. **Styling**: Customize CSS files

---

## Files to MODIFY (Customize These)

### Core Application
| Location | Purpose |
|----------|---------|
| `src/` | Main application code |
| `index.html` | HTML template, page title |

### Assets
| Location | Purpose |
|----------|---------|
| `public/` | Static assets |

---

## GSAP Animation Tips

GSAP (GreenSock Animation Platform) is used for animations.

```javascript
import gsap from 'gsap';

// Basic animation
gsap.to('.element', {
  duration: 1,
  x: 100,
  opacity: 1,
  ease: 'power2.out'
});

// ScrollTrigger for scroll-based animations
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

---

## Build and Test

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment Notes

**Build output**: `dist/` folder

Deploy the `dist/` folder to any static hosting service.
