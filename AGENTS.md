# AGENTS.md — Codebase Guide

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Overview

A personal blog built with **Next.js 16** (App Router, Cache Components / PPR), **React 19** (React Compiler), **Tailwind CSS v4**, and **Notion as the CMS backend**. Deployed to Vercel. No test suite exists in this project.

> `app-old/` is the archived pre-migration codebase (React Router / Remix). Keep it for reference; do not import from it.

---

## Commands

### Development
```bash
pnpm dev            # Start dev server (next dev)
```

### Build
```bash
pnpm build          # Production build (next build)
pnpm start          # Serve production build (next start)
```

### Lint / Format
```bash
pnpm lint           # biome check
pnpm format         # biome format --write
```

### Type Checking
```bash
pnpm typecheck      # tsc --noEmit
```
> Run `lint` + `typecheck` after changes. TypeScript strict mode is enabled.

---

## Architecture

```
src/
  app/                 # App Router routes
    layout.tsx         # Root shell: metadata, fonts, Analytics
    page.tsx           # Home (static shell + Suspense post list)
    posts/[slug]/      # Post page (generateStaticParams + generateMetadata)
    friends/           # Friends page (static)
    not-found.tsx      # Global 404
    sitemap.ts         # MetadataRoute.Sitemap
    globals.css        # Tailwind v4 entry: @theme tokens, dark scheme, prose styles
    api/               # Route handlers (bookmark, notion image/video/icons proxies)
  components/
    layout/            # Header, Footer, Container
    notion/            # Notion block renderers (Server Components)
    client/            # Interactive islands ('use client': shiki, mermaid, copy, back, bookmark)
    post-meta.tsx
  lib/
    notion.ts          # Notion API + Upstash Redis cache ('use cache', server-only)
    site-info.ts       # Blog metadata and friends list constants
    time.ts            # dayjs date formatting (zh-cn locale)
    utils.ts           # clsxm utility (clsx + tailwind-merge)
    colors.ts          # Notion color name -> Tailwind class lookup
  types.ts             # Shared TypeScript types
public/
  webfont/             # Operator Mono woff/woff2
  icon/
  robots.txt
```

---

## Code Style

- **Biome** is the single source of truth: double quotes, semicolons, 2-space indent. Run `pnpm format` before committing.
- TypeScript **strict mode**; path alias `@/*` maps to `./src/*`.
- Type-only imports use `import type { ... }`.
- File naming: kebab-case (`post-meta.tsx`, `notion-renderer.tsx`).
- Components: PascalCase; `function` declarations for route files, arrow functions for leaf components.
- Use `clsxm` (from `@/lib/utils`) for conditional class merging.

### Styling
- **Tailwind CSS v4** utilities are primary; tokens live in `@theme` in `globals.css`.
- Dark mode via `prefers-color-scheme` only — no manual toggle.
- Dynamic Notion/tag colors use CSS classes (`.notion-*`, `.tag-*`) from `globals.css` via `@/lib/colors` — never inline media-query styles.

### Next.js 16 specifics
- **Cache Components is enabled** (`cacheComponents: true`): every route must produce a static shell. Runtime reads (`params`, `searchParams`, `cookies()`, `headers()`, uncached fetches) must be inside `<Suspense>` or behind `'use cache'`.
- Data functions in `lib/notion.ts` use `'use cache'` + `cacheLife` + `cacheTag`; they must be async and never read runtime APIs.
- `params` / `searchParams` are **Promises** — always `await` them.
- Use global typed helpers: `PageProps<'/route'>`, `LayoutProps<'/'>`, `RouteContext<'/route'>`.
- `typedRoutes: true` — `<Link href>` must be a valid literal route.
- Server Components by default; add `'use client'` only for interactive islands.

### Server-Only Code
- `lib/notion.ts` imports `server-only`; never import it from Client Components.
- Environment variables are read from `process.env` (Next auto-loads `.env.local` — no `dotenv`).

### Error Handling
- Missing resources: `notFound()` in pages; route handlers return `new Response('Not Found', { status: 404 })`.
- Client errors in route handlers: `Response.json({ error: '...' }, { status: 400 })`.
- Wrap uncertain async operations in `try/catch` and return JSON error responses.

### Data Fetching
- Server data via async Server Components + cached functions in `lib/notion.ts`.
- Client-side fetches (e.g. bookmark unfurl) hit `src/app/api/*/route.ts` handlers.
- Notion API GET responses are cached in **Upstash Redis** for 1 hour (`ex: 3600`), independent of Next's cache.

---

## Environment Variables

Required in `.env.local` (see `.env.template`):

| Variable                   | Description                  |
|----------------------------|------------------------------|
| `NOTION_KEY`               | Notion integration secret    |
| `NOTION_DATABASE_ID`       | Notion database ID for posts |
| `NOTION_CREATOR_ID`        | Notion user ID of blog owner |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis URL            |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token          |

---

## Key Dependencies

| Package                  | Purpose                              |
|--------------------------|--------------------------------------|
| `next` v16               | Framework (App Router, PPR)          |
| `react` / `react-dom` v19| UI (React Compiler enabled)          |
| `@notionhq/client`       | Notion API client                    |
| `@upstash/redis`         | Redis cache for Notion responses     |
| `shiki`                  | Syntax highlighting (client, lazy)   |
| `mermaid`                | Diagram rendering (client, lazy)     |
| `katex`                  | Math rendering (server-side)         |
| `tailwindcss` v4         | Utility-first CSS                    |
| `dayjs`                  | Date formatting (zh-cn locale)       |
| `clsx` + `tailwind-merge`| Class name composition (`clsxm`)     |
| `unfurl.js`              | URL metadata for bookmark blocks     |
| `@vercel/analytics`      | Vercel Analytics                     |
| `@biomejs/biome`         | Lint + format                        |
