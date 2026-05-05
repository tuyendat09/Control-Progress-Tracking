@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server (default :3000)
npm run build        # Production build
npm run start        # Serve the production build
npm run lint         # ESLint v9 flat config (eslint-config-next)
npm run format       # Prettier write — uses prettier-plugin-tailwindcss for class sorting
npm run format:check # Prettier check (no write)
```

No test runner is configured — do not invent one.

`bun.lockb` exists alongside no `package-lock.json` / `yarn.lock`; treat **bun** as the canonical install/runtime locally (`bun install`, `bun run dev`). Scripts themselves call `next` directly so any package manager works.

## Stack snapshot

- **Next.js 16.2.4 + React 19.2.4** — App Router. The pinned `AGENTS.md` warning ("This is NOT the Next.js you know") applies: APIs and conventions may differ from earlier Next versions; check `node_modules/next/dist/docs/` before relying on memory.
- **TypeScript** with `strict: true` and path alias `@/* → src/*`.
- **Tailwind v4** via `@tailwindcss/postcss`. **There is no `tailwind.config.*`** — design tokens and the `dark` variant are declared in `src/app/globals.css` (`@theme { … }` and `@custom-variant dark …`). New utility tokens go there, not in a JS config.
- **next-themes** with `attribute="class"` (toggles `.dark` on `<html>`). The `dark` Tailwind variant is wired manually in `globals.css`; both must stay in sync.
- **TanStack Query** (`providers/query-provider.tsx`) — default `staleTime: 60s`, `retry: 1`, devtools mounted.
- **Zustand** (`store/app-store.ts`) for ephemeral client state, with `devtools` middleware.
- **react-hook-form + Zod** for forms; resolvers via `@hookform/resolvers/zod`.
- **Axios** (`lib/axios.ts`) — single instance reading `NEXT_PUBLIC_API_URL`, falling back to `/api`.
- **PWA** — `app/manifest.ts` + `components/pwa/ServiceWorkerRegister.tsx` (registers `/sw.js`) and `InstallBanner.tsx`. Both are currently commented out in `app/layout.tsx`; re-enable them together when shipping PWA changes.

## Architecture

### Routing & component layout

Two parallel route-group conventions are in play and must be kept aligned:

- `src/app/(group)/route/page.tsx` — Next.js route group + page.
- `src/components/(group)/feature/*.tsx` — feature components scoped to the matching route group.
- `src/components/pages/(group)/feature/*.tsx` — page-level composition components (a second layer between `app/` and atomic feature components).

Example: the login surface spans `app/(auth)/login/page.tsx`, `components/pages/(auth)/login/Login.tsx`, and `components/(auth)/login/*` (form parts, container, shell, hook). When adding a route, mirror this structure rather than collapsing layers.

Within a feature folder, the pattern is **Container → Shell → fields**, with hooks isolated in a `hook/` subfolder (see `components/(auth)/login/hook/useLoginForm.ts`). Container wires the hook; Shell is presentational.

### Design system

`.claude/DESIGN.md` is the authoritative Apple-derived design spec (colors, typography, components, do/don'ts). When adding UI:

- Reference tokens by name, not raw hex. If a needed token is missing, **add it to `globals.css` under `@theme`**, then use it via Tailwind utilities (e.g. `bg-glass-fill`, `rounded-pill`).
- The "glass-*" and "danger-*" tokens currently in `globals.css` are explicit extensions to DESIGN.md (DESIGN.md has no glassmorphism or validation tones). Keep that distinction in comments when adding more.
- `src/components/ui/` holds reusable primitives. Components grouped into folders (e.g. `ui/input/Input.tsx` + `ui/input/index.ts`) re-export through a barrel `index.ts`.

### Layout & providers

`app/layout.tsx` wraps everything in `ThemeProvider → QueryProvider`. `AuthProvider` (`context/auth/AuthContext.tsx`) exists but is **not currently mounted in the root layout** — wire it in deliberately if a feature needs it. `useAuth` throws when used outside the provider.

### Static design previews

`preview-design/*.html` are standalone HTML mockups used by the `ui-ux-html-previewer` and `html-to-tsx-converter` agents (configured in `.claude/agents/`). They are not part of the Next build.

## Conventions

- Default to **server components**; add `'use client'` only when the file uses hooks, browser APIs, event handlers, or context.
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional class composition.
- Prettier + `prettier-plugin-tailwindcss` is the source of truth for class ordering; do not hand-sort.
- Path imports use the `@/` alias — never write deep relative imports across `src/` boundaries.
