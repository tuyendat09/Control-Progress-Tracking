---
name: Project commit and structure conventions
description: Commit style, component structure, and dependency conventions for control-client
type: project
---

Commit style: recent history uses terse messages ("update", "update pwa") but conventional commits (feat/fix/refactor + scope) are acceptable and preferred when the diff warrants it. No issue tracker references observed yet.

Component structure follows three layers:
- `src/app/(group)/route/page.tsx` — route entry
- `src/components/pages/(group)/feature/` — page-level composition
- `src/components/(group)/feature/` — atomic feature components

`src/components/ui/` holds reusable primitives; grouped components use a folder + barrel `index.ts` pattern.

Design tokens live in `src/app/globals.css` under `@theme {}`. No `tailwind.config.*` exists.

Bun is the canonical package manager (`bun install`, `bun run dev`). Do not stage `package-lock.json` — it is a npm artifact and not the lock file in use.

Dependencies: @heroui/react + @heroui/styles added; lucide-react removed in favor of react-icons.

**Why:** Established by the project setup and confirmed by CLAUDE.md content.
**How to apply:** Follow the three-layer component structure when adding routes. Always exclude package-lock.json from commits.
