# AGENTS.md — Codebase Guide

## Project Overview

A personal blog built with **React Router v7** (SSR + prerendering), **Tailwind CSS v4**, and **Notion as the CMS backend**. Deployed to Vercel. No test suite exists in this project.

---

## Commands

### Development
```bash
pnpm run dev          # Start dev server (Vite + React Router HMR)
```

### Build
```bash
pnpm run build        # Production build via react-router build
pnpm run start        # Serve the built output (./build/server/index.js)
```

### Type Checking
```bash
pnpm run typecheck    # Runs: react-router typegen && tsc
```
> Always run `typecheck` after changes — there is no separate lint script. TypeScript strict mode is enabled.

### No Test Suite
There are no unit or integration tests in this project. There is no `test` script in `package.json`.

---

## Architecture

```
app/
  apis/           # Route-module API handlers (loader/action exports)
  components/
    common/       # Shared utility components (e.g. loading spinner)
    layout/       # Page layout: Header, Footer, Main, Container, Root
    list/         # Post list components (infinite scroll)
    notion/       # Notion block renderers
      blocks/     # One file per Notion block type
    post/         # Post-specific UI: tags, category, copyright
    ui/           # Generic UI: code highlighter (Shiki), Mermaid
  libs/
    helper.ts           # clsxm utility (clsx + tailwind-merge)
    notion.server.ts    # All Notion API calls (server-only, Redis cache)
    time.ts             # dayjs date formatting (zh-cn locale)
  providers/            # React context providers (React Query)
  routes/               # Page route components (home, posts, friends)
  routes.ts             # Route config (react-router routes)
  root.tsx              # App shell: Layout, ErrorBoundary, Analytics
  site-info.ts          # Blog metadata and friends list constants
  styles/               # Global CSS, web fonts
  types.d.ts            # Shared TypeScript types
```

---

## Code Style

### TypeScript
- **Strict mode** is enabled (`"strict": true` in `tsconfig.json`).
- Use `verbatimModuleSyntax`: always use `import type` for type-only imports.
- Target is `ES2022`; module resolution is `bundler`.
- Path alias `~/*` maps to `./app/*` — always use this alias for imports within `app/`.

### Imports
- Type-only imports must use `import type { ... }`:
  ```ts
  import type { PropsWithChildren } from 'react'
  import type { Block } from '~/types'
  ```
- Group imports: types first, then external libraries, then internal `~/` aliases.
- No barrel `index.ts` re-exports in most directories — import from the specific file.

### Formatting
- **No formatter config** (no Prettier/ESLint config present). Follow the existing style:
  - 4-space indentation.
  - Single quotes for strings in TypeScript/TSX.
  - Opening braces on the same line; no trailing commas in function parameters.
  - JSX attribute alignment follows the existing pattern (one prop per line when many attributes, inline when few).
  - Object destructuring in function parameters is preferred.

### Naming Conventions
- **Files**: `kebab-case` for all files (`post-item.tsx`, `notion-renderer.tsx`).
  - Exception: PascalCase is used for some UI component files (`CodeHighlighter.tsx`, `ShikiWrapper.tsx`).
- **Components**: PascalCase named exports or default exports.
  - Arrow function components for simple ones; `function` declarations for route components.
- **Functions/variables**: `camelCase`.
- **Constants**: `camelCase` for exported site config (e.g. `blogName`, `blogLink`).
- **Interfaces/Types**: PascalCase (`PostMeta`, `PostsResponse`, `Block`).
- **CSS module files** (vanilla-extract): `styled.css.ts` naming pattern.

### React Components
- Use arrow functions for leaf/presentational components:
  ```tsx
  export const Header = () => { ... }
  ```
- Use `function` declarations for route-level components (loader-bearing routes):
  ```tsx
  export default function Home({ loaderData }: Route.ComponentProps) { ... }
  ```
- Props types are declared inline as object types or as `PropsWithChildren<{...}>` — avoid standalone interface declarations for simple prop shapes unless reused.
- Use `clsxm` (from `~/libs/helper`) for conditional class merging — never concatenate class strings manually.

### Styling
- **Tailwind CSS v4** utility classes are the primary styling method.
- **vanilla-extract** (`*.css.ts` files) is used for complex, dynamic, or animation-based styles that cannot be expressed in Tailwind.
- `darkMode` is driven by `prefers-color-scheme` media query in vanilla-extract, and by the `dark` class in Tailwind config.
- Avoid inline `style` props; prefer Tailwind classes or vanilla-extract.

### Server-Only Code
- Files that call Notion API or Redis must be named `*.server.ts` to make the server-only boundary explicit.
- Never import `*.server.ts` modules from client-side components.
- Environment variables are destructured from `process.env` at module top level with defaults:
  ```ts
  const { NOTION_KEY = '', NOTION_DATABASE_ID = '' } = process.env
  ```

### Error Handling
- In route loaders, throw `new Response("Not Found", { status: 404 })` for missing resources.
- In API route actions, return `Response.json({ error: '...' }, { status: 400 })` for client errors.
- Wrap uncertain async operations in `try/catch` and return JSON error responses rather than letting exceptions propagate to the client.
- The root `ErrorBoundary` in `app/root.tsx` handles uncaught route errors; respect it.

### Data Fetching
- Server data fetching uses React Router **loaders** (`export async function loader`).
- Client-side infinite/paginated data uses **TanStack Query** (`useSuspenseInfiniteQuery`).
- Loaders prefetch TanStack Query state on the server via `QueryClient.prefetchInfiniteQuery` and pass `dehydrate(queryClient)` to the client via `HydrationBoundary`.
- HTTP API calls from the client use **axios** (`~/components/list/more-posts.tsx` pattern).
- Notion API GET responses are cached in **Upstash Redis** for 1 hour (`ex: 3600`).

### Types
- Shared types live in `app/types.d.ts` — add new shared types here.
- Prefer discriminated unions for variant data (`Block` type with `has_children: true/false`).
- Use `satisfies` for config objects to get type-checking without widening (see `react-router.config.ts`).

---

## Environment Variables

Required in `.env.local` (see `.env.template`):

| Variable             | Description                     |
|----------------------|---------------------------------|
| `NOTION_KEY`         | Notion integration secret       |
| `NOTION_DATABASE_ID` | Notion database ID for posts    |
| `UPSTASH_REDIS_REST_URL`  | Upstash Redis URL          |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token       |

---

## Key Dependencies

| Package                    | Purpose                              |
|----------------------------|--------------------------------------|
| `react-router` v7          | SSR framework + routing              |
| `@notionhq/client`         | Notion API client                    |
| `@upstash/redis`           | Redis cache for Notion responses     |
| `@tanstack/react-query` v5 | Client-side data fetching            |
| `shiki`                    | Syntax highlighting (lazy-loaded)    |
| `mermaid`                  | Diagram rendering                    |
| `@vanilla-extract/css`     | Type-safe CSS-in-JS                  |
| `tailwindcss` v4           | Utility-first CSS                    |
| `dayjs`                    | Date formatting (zh-cn locale)       |
| `clsx` + `tailwind-merge`  | Class name composition (`clsxm`)     |
| `axios`                    | Client HTTP requests                 |
| `unfurl.js`                | URL metadata for bookmark blocks     |
