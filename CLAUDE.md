# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a cybersecurity/IT professional. Built with Next.js 16 (App Router) and configured for **static export** (`output: 'export'` in next.config.ts) — there is no server-side runtime. Requires Node.js >=20.

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build (static export to /out)
npm run start    # Serve production build
npm run lint     # Run ESLint (flat config, ESLint 9)
```

No test framework is configured.

## Architecture

### Routing

Next.js App Router with two routes:
- `/` — Homepage (`app/page.tsx`), composes all portfolio sections in order
- `/work` — Work examples detail page (`app/work/page.tsx`)

In-page navigation uses anchor links (`#experience`, `#education`, etc.) with Lenis smooth scrolling.

### Component Organization

- **`components/sections/`** — Full page sections (hero, about, experience, education, skills, projects, testimonials, contact, work-examples-preview). Each section is self-contained and imports its own data.
- **`components/layout/`** — Structural wrappers: navbar, footer, mobile-menu, theme-provider, smooth-scroll. These are composed in `app/layout.tsx`.
- **`components/ui/`** — Reusable primitives: button, magnetic-button, command-palette (Cmd+K), theme-toggle, typewriter, video-player, etc.
- **`components/motion/`** — Animation wrapper (`animate-in.tsx`).

### Data / Content Layer

All content lives in **`content/*.ts`** as typed TypeScript objects (no CMS, no API). Each file exports interfaces and data arrays:
- `experience.ts`, `education.ts`, `skills.ts`, `projects.ts`, `work-examples.ts`, `social.ts`

Section components import data directly: `import { education } from '@/content/education'`.

### Styling & Theming

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin.
- Dark/light theme via CSS custom properties in `app/globals.css` (`:root` for light, `.dark` for dark). Managed by `next-themes`.
- Accent color: green (`--accent`). Fonts: Syne (headings via `--font-syne`), JetBrains Mono (monospace via `--font-jetbrains-mono`).

### Animation

- **Framer Motion** for all animations. Reusable presets in `lib/animations.ts` (`fadeInUp`, `fadeIn`, `slideInLeft`, `staggerContainer`).
- Scroll-triggered animations use Framer Motion's `whileInView`.

### Key Utilities

- `lib/utils.ts` — `cn()` function (clsx + tailwind-merge) for conditional class merging.
- `hooks/use-active-section.ts` — IntersectionObserver hook that tracks which section is in viewport (used by navbar for active link highlighting).

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json).

## Important Constraints

- **Static export only**: No server components with data fetching, no API routes, no middleware. All components using React hooks must have `"use client"` directive.
- **No test suite**: There are no tests configured. If adding tests, you'd need to set up a framework (e.g., Vitest or Jest).
- **No state management library**: State is local React hooks only (useState, useRef, useEffect). Theme state is via next-themes.
