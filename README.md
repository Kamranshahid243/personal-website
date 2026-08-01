# Personal site

The source for a personal software engineering site. Not a portfolio gallery —
its job is to convince recruiters, founders and business owners to get in
touch.

This repository currently contains the **architecture and design system only**.
The toolchain, tokens, component primitives, content pipeline and SEO layer are
in place and verified; the pages have not been designed yet.

Run `pnpm dev` and open:

- [`/design`](http://localhost:3000/design) — every token and primitive
- [`/components`](http://localhost:3000/components) — every reusable component
  with sample data

## Stack

| Concern    | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, React 19, Turbopack)                 |
| Language   | TypeScript, strict + `noUncheckedIndexedAccess`              |
| Styling    | Tailwind CSS v4, CSS-first config with design tokens         |
| Components | shadcn/ui on Radix primitives                                |
| Icons      | Lucide                                                       |
| Motion     | Framer Motion                                                |
| Forms      | React Hook Form + Zod                                        |
| Theming    | next-themes (class strategy, no flash)                       |
| Content    | MDX via next-mdx-remote, Shiki highlighting, Zod frontmatter |
| Typography | Geist Sans / Geist Mono, self-hosted through next/font       |
| Tooling    | ESLint (flat config), Prettier, GitHub Actions               |

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Then personalise `src/config/site.ts` — name, role, tagline, email and social
links. Everything else reads from there.

## Scripts

| Command              | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `pnpm dev`           | Dev server on http://localhost:3000            |
| `pnpm build`         | Production build                               |
| `pnpm start`         | Serve the production build                     |
| `pnpm typecheck`     | `tsc --noEmit`                                 |
| `pnpm lint`          | ESLint                                         |
| `pnpm format`        | Prettier, writing changes                      |
| `pnpm check`         | Typecheck + lint + format check (what CI runs) |
| `pnpm ui:add <name>` | Add a shadcn/ui primitive                      |

## Layout

```
content/blog/        MDX articles
docs/                Architecture and decision notes
public/              Static assets
src/app/             Routes, route groups, metadata files
src/components/      ui · layout · common · cards · sections · forms · motion · mdx · providers · seo
src/config/          Site identity and navigation
src/data/            Typed content: projects, services, testimonials, experience, FAQ
src/hooks/           Reusable client hooks
src/lib/             Content, MDX, SEO, validation, utilities
src/server/          Server actions and services
src/styles/          Design tokens, base, utilities, prose
src/types/           Shared type definitions
```

Documentation:

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — repository and modules
- [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) — tokens and primitives
- [`docs/SITE-ARCHITECTURE.md`](./docs/SITE-ARCHITECTURE.md) — routes, layouts,
  metadata, images, SEO for `/`, Projects and Blog
- [`docs/HOMEPAGE.md`](./docs/HOMEPAGE.md) — homepage UX and section order

## Next steps

1. Personalise `src/config/site.ts`.
2. Align navigation and sitemap with the three-surface IA in
   `SITE-ARCHITECTURE.md`.
3. Build `/projects` and `/projects/[slug]`, then blog routes, then the real
   home page — pages not coded yet by design.
4. Replace sample `src/data` entries and add real `content/blog` articles.
5. Add favicons under `app/` or `public/`.
