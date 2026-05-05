# Control

A progress-tracking PWA for athletes navigating cutting and bulking phases — built to answer one question across every cycle:

> **Are you actually losing strength when cutting, or actually gaining when bulking?**

Control logs your workouts, nutrition, and body metrics, then plots strength against bodyweight and calories over time so the relationship between training load, body composition, and lift performance is visible at a glance.

## Why

Most fitness apps log data; few visualize the trade-off that matters. During a cut, lifters expect strength to drop slightly — but how much is acceptable? During a bulk, weight goes up — but is the strength gain proportional, or is it mostly fat? Control overlays workout PRs and volume against bodyweight, calories in/out, and muscle-group coverage, so cycle-over-cycle decisions are data-driven instead of based on vibes.

## Features

- **Workout logging** — exercise library (50+ seeded exercises with muscle-group mapping), session builder, sets / reps / weight tracking, automatic PR detection.
- **Nutrition tracking** — daily macros, calories in vs. out (workout-burned subtracted), Open Food Facts search for international foods, custom-food table for Vietnamese dishes.
- **Progress charts** — volume and PR trends, weekly nutrition rollups, side-by-side cut/bulk strength comparison.
- **Anatomy viewer** — interactive SVG body map highlighting trained muscle groups; rule-based suggestion engine flags under-trained areas across 7 / 30-day windows.
- **PWA, mobile-first** — installable on iOS / Android home screen, dark mode, offline-friendly.
- **Auth** — JWT-based, multi-user accounts.

## Tech Stack

**Client (this repo)**

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens defined in `globals.css` under `@theme` (no JS config)
- [HeroUI](https://www.heroui.com) UI primitives
- [TanStack Query](https://tanstack.com/query) — server state
- [Zustand](https://zustand-demo.pmnd.rs) — client state
- [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) — forms & validation
- [next-themes](https://github.com/pacocoursey/next-themes) — dark mode
- PWA — manifest + service worker

**Backend** (separate repo)

- [NestJS](https://nestjs.com)
- MySQL + [Prisma](https://www.prisma.io)
- JWT auth

## Getting Started

This project uses **[bun](https://bun.sh)** as the canonical package manager. The `next` CLI works with any package manager, but `bun.lockb` is the source of truth for installs.

```bash
bun install
bun run dev          # dev server at http://localhost:3000
```

### Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Next.js dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve production build |
| `bun run lint` | ESLint v9 (flat config) |
| `bun run format` | Prettier write — sorts Tailwind classes via plugin |
| `bun run format:check` | Prettier check (no write) |

### Environment

Create `.env.local` with:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Falls back to `/api` if unset (see `src/lib/axios.ts`).

## Roadmap

Total estimated timeline: **~14–19 weeks** (~3.5–5 months part-time).

| Phase | Focus | Duration |
| --- | --- | --- |
| **Phase 0** ⭐ | **Design System & UX** — Figma tokens (color, spacing, typography, radius), Storybook 8 component library, hi-fi mobile-first mockups, dark-mode variants. Wireframes for the 5 core screens: Dashboard, Workout Log, Food Log, Progress, Anatomy. | 2–3 weeks |
| **Phase 1** | **Foundation** — Next.js App Router skeleton, NestJS API, MySQL + Prisma, JWT auth, PWA manifest + service worker, design-token import from Figma. | 2 weeks |
| **Phase 2** | **Workout Builder & Progress** — exercise library, session builder, log sets/reps/weight, PR tracker, volume/PR charts, 50+ seeded exercises with muscle-group mapping. | 3–4 weeks |
| **Phase 3** | **Calorie & Nutrition Tracker** — Open Food Facts integration, custom-food table, daily macro breakdown, calories in vs. workout-burned, weekly chart. | 3–4 weeks |
| **Phase 4** ⭐ | **Anatomy Viewer & Smart Suggest** — interactive SVG body map (primary/secondary muscle highlight), 7/30-day coverage analysis, rule-based suggestion engine for under-trained muscles. | 4–6 weeks |

⭐ = portfolio-highlight phase.

## Project Structure

```
src/
  app/                     # Next.js App Router routes (route groups: (auth), (dashboard))
  components/
    pages/                 # Page-level composition (mirrors app/ groups)
    (auth)/, (dashboard)/  # Feature components scoped to route groups
    ui/                    # Reusable primitives (Input, etc.)
    pwa/                   # ServiceWorkerRegister, InstallBanner
  context/, providers/     # Auth, Theme, TanStack Query providers
  store/                   # Zustand stores
  lib/                     # axios instance, cn() utility
preview-design/            # Standalone HTML mockups (not part of the build)
```

Design tokens and the `dark` Tailwind variant live in `src/app/globals.css` under `@theme` and `@custom-variant`. There is **no `tailwind.config.*`** — Tailwind v4 is fully CSS-driven here. The Apple-derived design spec lives in `.claude/DESIGN.md`.

## License

All rights reserved. This project is currently private; no license is granted for use, modification, or redistribution.
