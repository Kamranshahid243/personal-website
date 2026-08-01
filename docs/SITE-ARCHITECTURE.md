# Site architecture

The public site has three surfaces and two detail routes. Nothing else ships in
v1. This document is the plan for folder structure, routing, layouts, metadata,
images and SEO — **before any page is coded**.

Commercial job (unchanged): convince a recruiter, founder or business owner to
make contact. With a smaller page set, that job concentrates on the home page
and the project detail pages; the blog builds long-term inbound.

Related docs:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — repository layout and module rules
- [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) — tokens and primitives
- [`HOMEPAGE.md`](./HOMEPAGE.md) — homepage UX, section order, conversion rationale

---

## Public information architecture

| URL                | Purpose                                                | Content source                                                |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------- |
| `/`                | Pitch: who you are, proof, selected work, writing, ask | Composed from `siteConfig` + featured projects + recent posts |
| `/projects`        | Full project index                                     | `src/data/projects.ts`                                        |
| `/projects/[slug]` | One case study                                         | Same collection, keyed by `slug`                              |
| `/blog`            | Writing index                                          | `content/blog/*.mdx` via `src/lib/content/blog.ts`            |
| `/blog/[slug]`     | One article                                            | One MDX file, compiled at build time                          |

### What is deliberately not a page

| Need                | How it is handled instead                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Contact             | Primary CTA → `mailto:` or `siteConfig.links.calendar`. No `/contact` form page in v1.          |
| About / Services    | Folded into the home page (short bio, how you work, offer) so the site stays three clicks deep. |
| Legal               | Deferred. Add `(legal)` only when a real privacy/terms obligation exists.                       |
| Design / Components | Stay under `(dev)/`, `noIndex`, out of the sitemap. Internal tooling only.                      |

Fewer URLs means every indexed page has a job. A thin `/about` that restates
the home page is worse than no `/about`.

---

## Routing

### URL conventions

```
/                         Home
/projects                 Project index
/projects/:slug           Project detail          e.g. /projects/checkout-performance
/blog                     Blog index
/blog/:slug               Blog article            e.g. /blog/example-post
```

Rules:

- **Plural collection, singular resource.** `/projects` lists; `/projects/[slug]`
  is one. Same for `/blog`.
- **Slugs are stable.** Renaming a slug is a breaking URL — prefer updating the
  title and leaving the slug alone. If a rename is unavoidable, add a redirect
  in `next.config.ts` rather than leaving a 404 for a shared link.
- **No trailing slash.** Next.js default; keep canonicals slash-free.
- **No query-string content.** Filters on `/blog` (if added later) may use
  `?tag=` but the canonical URL stays `/blog` or `/blog/[slug]`.

### App Router tree (target)

Route groups do not appear in the URL. `(marketing)` exists so every public
page shares one shell without nesting `/projects` under a useless segment.

```
src/app/
├── layout.tsx                      Root document (fonts, providers, skip link, site-wide JSON-LD)
├── not-found.tsx                   Global 404
├── error.tsx                       Route error boundary
├── global-error.tsx                Root layout failure
├── sitemap.ts                      Generated sitemap.xml
├── robots.ts                       Generated robots.txt
├── manifest.ts                     Web app manifest
├── api/
│   └── og/
│       └── route.tsx               Dynamic Open Graph images
├── (marketing)/
│   ├── layout.tsx                  Navbar + <main id="main"> + Footer
│   ├── page.tsx                    /
│   ├── projects/
│   │   ├── page.tsx                /projects
│   │   └── [slug]/
│   │       ├── page.tsx            /projects/[slug]
│   │       └── not-found.tsx       Unknown project slug
│   └── blog/
│       ├── page.tsx                /blog
│       └── [slug]/
│           ├── page.tsx            /blog/[slug]
│           └── not-found.tsx       Unknown / draft (in production) post
└── (dev)/                          Internal only — noindex, not in sitemap
    ├── design/page.tsx
    └── components/page.tsx
```

### Dynamic params

Both detail routes are **fully static**.

| Route              | `generateStaticParams` source                           | Missing slug                         |
| ------------------ | ------------------------------------------------------- | ------------------------------------ |
| `/projects/[slug]` | `projects.map(p => p.slug)` from `src/data/projects.ts` | `notFound()` → local `not-found.tsx` |
| `/blog/[slug]`     | `getAllPostSlugs()` from the content layer              | `notFound()` → local `not-found.tsx` |

`dynamicParams = false` on both detail segments once implemented: an unknown
slug is a 404 at the edge, not an on-demand render of an empty page.

Draft posts: already excluded from `getAllPosts()` in production. In
development they remain reachable for preview. Detail pages call
`getPostBySlug` and `notFound()` when the post is missing or is a draft outside
development.

### Redirects from the previous IA

The scaffold still mentions `/work`, `/services`, `/about`, `/contact`. When
pages land, add permanent redirects so nothing bookmarked during development
rots:

| From                              | To                                  |
| --------------------------------- | ----------------------------------- |
| `/work`                           | `/projects`                         |
| `/work/:slug`                     | `/projects/:slug`                   |
| `/services`, `/about`, `/contact` | `/` (or remove once nav is updated) |

---

## Folder structure (content + UI that pages will use)

Pages stay thin. Structure below is what they read from and compose — most of
it already exists.

```
content/
└── blog/
    └── <slug>.mdx                  One file per article (frontmatter + body)

public/
├── images/
│   ├── projects/
│   │   └── <slug>/                 Cover + in-case-study assets per project
│   │       ├── cover.jpg
│   │       └── *.jpg
│   └── blog/
│       └── <slug>/                 Optional article images
│           └── *.jpg
├── og/                             Optional static fallback OG assets
├── icon.svg
└── apple-icon.png

src/
├── app/                            Routes only (tree above)
├── components/
│   ├── layout/                     Navbar, MobileNav, Footer, Container, Section
│   ├── sections/                   Home- and page-level blocks (Hero, FeaturedProjects, …)
│   ├── cards/                      ProjectCard, BlogCard, …
│   ├── common/                     SectionHeading, TechStack, SocialLinks, …
│   ├── mdx/                        MdxContent + element map
│   └── ui/                         Design system primitives
├── config/
│   ├── site.ts                     Identity, email, socials, availability
│   └── navigation.ts               Main nav = Projects, Blog; CTA = mailto/calendar
├── data/
│   └── projects.ts                 Typed project collection (source of truth)
├── lib/
│   ├── content/
│   │   ├── blog.ts                 FS reader + cache
│   │   └── schema.ts               Zod frontmatter
│   ├── seo/
│   │   ├── metadata.ts             createMetadata()
│   │   └── json-ld.ts              Person, WebSite, BlogPosting, CreativeWork
│   └── mdx/                        remark/rehype pipeline
└── types/
    ├── content.ts                  Project (and any remaining shared types)
    └── blog.ts                     Post, PostSummary
```

### Content ownership

| Kind          | Lives in                   | Why                                                                                                                    |
| ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Projects      | `src/data/projects.ts`     | Structured, relational, small. Typed fields (`problem` / `approach` / `outcome` / `metrics`) are the persuading shape. |
| Blog posts    | `content/blog/*.mdx`       | Long-form prose. Frontmatter validated by Zod at read time.                                                            |
| Site identity | `src/config/site.ts`       | Name, tagline, email, socials — referenced by shell, metadata and JSON-LD.                                             |
| Navigation    | `src/config/navigation.ts` | Desktop nav, mobile nav, footer, sitemap — one list.                                                                   |

Projects do **not** become MDX in v1. A case study is a data object rendered by
a fixed template (problem → approach → outcome). That template is the product;
giving every project a free-form MDX body invites inconsistent pages. If a
project later needs a long narrative appendix, add an optional MDX body then —
do not start there.

### Navigation target (when pages are built)

```
mainNav:     Projects → /projects    Blog → /blog
primaryCta:  Get in touch → mailto: or calendar URL (external)
footer:      Site (Home, Projects, Blog) · Elsewhere (socials)
```

---

## Reusable layouts

Three layout layers. Each adds something the one below cannot.

```
RootLayout                 Document shell
  └─ MarketingLayout       Site chrome
       └─ Page             Route-specific composition
            └─ (optional)  Article / Project template wrappers
```

### 1. Root layout — `src/app/layout.tsx`

Owns everything that must wrap the entire app:

- `<html>` / `<body>`, font variables, `suppressHydrationWarning` for themes
- Global CSS entry
- `<Providers>` (theme, tooltip, toaster)
- Skip link → `#main`
- Site-wide JSON-LD (`Person` + `WebSite`)
- Default `metadata` and `viewport`

Does **not** own the navbar or footer. Those belong to the marketing shell so
`(dev)` routes can opt out.

### 2. Marketing layout — `src/app/(marketing)/layout.tsx`

Owns the public chrome:

```
<Navbar />
<main id="main">{children}</main>
<Footer />
```

Every public page (`/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`)
renders inside this layout. One place to change header/footer behaviour.

### 3. Page-level composition (not nested layouts unless needed)

Prefer **section composition inside `page.tsx`** over another layout layer:

| Page               | Composes                                                                      |
| ------------------ | ----------------------------------------------------------------------------- |
| `/`                | Hero → Featured projects → Selected writing → CTA                             |
| `/projects`        | SectionHeading → project grid                                                 |
| `/projects/[slug]` | Case study template (header, metrics, problem/approach/outcome, stack, links) |
| `/blog`            | SectionHeading → post list/grid                                               |
| `/blog/[slug]`     | Article header → `<MdxContent />` → adjacent posts / CTA                      |

Use a **nested layout** only when two or more routes share persistent UI that
is not the site chrome. Candidates worth considering later (not v1):

- `blog/layout.tsx` — only if the index and the article share a sidebar or
  reading-progress chrome. Until then, keep blog pages independent.
- `projects/layout.tsx` — unlikely; index and detail have different measure
  (wide grid vs prose-width case study).

### Detail templates as components, not layouts

Project and article chrome (back link, title block, metadata row) should live
as components:

- `components/sections/project-header.tsx` (or `components/project/…`)
- `components/sections/article-header.tsx`

Layouts are for persistent UI across routes. Templates are for repeated page
structure with different data. Conflating them makes `children` awkward and
metadata harder to colocate.

### Measure rules (layout behaviour without extra layouts)

| Surface        | Container width                           | Why                                   |
| -------------- | ----------------------------------------- | ------------------------------------- |
| Home sections  | `content` / `wide`                        | Marketing rhythm                      |
| Project index  | `wide`                                    | Card grid                             |
| Project detail | `content` for narrative, `wide` for media | Readable story + room for screenshots |
| Blog index     | `content` or `wide`                       | List or card grid                     |
| Blog article   | `prose` via `.prose`                      | Comfortable measure for reading       |

---

## Metadata strategy

### Principles

1. **Every public page calls `createMetadata()`.** No hand-rolled `Metadata`
   objects — that is how a shared page ships without a canonical.
2. **`metadataBase`** comes from `siteConfig.url` (validated in `src/env.ts`).
3. **Title formula:** `Page title — {siteConfig.name}` for inner pages; home
   uses `{name} — {role}`.
4. **Description:** 150–160 characters where possible. Projects use `summary`;
   posts use frontmatter `description`; home uses `siteConfig.description`.
5. **Canonical:** always the pathname of the page itself. No self-referencing
   duplicates, no query strings in canonicals.
6. **Indexability:** public routes indexable; `(dev)/*`, drafts, and pure
   utility routes (`/api/*`) are `noIndex` or disallowed in robots.

### Per-route metadata plan

| Route              | `title`                 | `description`                          | `image`                                          | Extra                                            |
| ------------------ | ----------------------- | -------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| `/`                | default (`Name — Role`) | `siteConfig.description`               | OG via `/api/og?title={tagline}`                 | —                                                |
| `/projects`        | `Projects`              | Short index blurb (config or constant) | Default OG                                       | —                                                |
| `/projects/[slug]` | `project.title`         | `project.summary`                      | Project cover if present, else `/api/og?title=…` | Optional keywords from `stack`                   |
| `/blog`            | `Writing` or `Blog`     | Index blurb                            | Default OG                                       | —                                                |
| `/blog/[slug]`     | `post.title`            | `post.description`                     | `post.image` or `/api/og?title=…`                | `publishedTime`, `modifiedTime`, `type: article` |
| `(dev)/*`          | whatever                | —                                      | —                                                | `noIndex: true`                                  |

### Implementation pattern (when coding pages)

```ts
// Static page
export const metadata = createMetadata({
  title: "Projects",
  description: "…",
  pathname: "/projects",
});

// Dynamic page
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return createMetadata({ title: "Not found", noIndex: true });
  return createMetadata({
    title: project.title,
    description: project.summary,
    pathname: `/projects/${project.slug}`,
    image: project.cover?.src,
  });
}
```

### Open Graph images

Priority order for `image`:

1. Explicit asset on the content object (`project.cover.src`, `post.image`)
2. Generated `/api/og?title=…&eyebrow=…` (already implemented)
3. Site default (`siteConfig.ogImage`) only if the generator is unavailable

OG titles should match the page title users see in the tab, not a separate
marketing line — mismatch between tab title and Slack preview erodes trust.

### Twitter / X

`createMetadata` already emits `summary_large_image`. No separate Twitter-only
titles unless a post is widely shared and needs a tighter card later.

---

## Image strategy

### Goals

- Fast LCP on home and project details (covers are LCP candidates)
- Consistent aspect ratios in grids so cards do not jump
- No remote hotlinking in v1
- Accessible `alt` text that describes the content, not the file

### Where files live

```
public/images/projects/<slug>/cover.jpg    Card + detail hero
public/images/projects/<slug>/*.jpg        In-article / gallery frames
public/images/blog/<slug>/*.jpg            Optional MDX images
```

Why `public/` rather than `src/assets` for v1:

- Project covers are referenced from typed data (`cover.src` as a string path)
- MDX authors can write plain `/images/blog/…` paths
- `next/image` still optimises files served from `public/` when used through
  `<Image />`

If a build-time imported image (blur placeholder, typed import) is needed
later, co-locate that asset next to the component and keep **content** images
in `public/images`.

### Formats and delivery

| Rule           | Detail                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pipeline       | Always `next/image` in app code. MDX uses the mapped `Img` component (already in `mdx-components.tsx`), never a raw `<img>`, when dimensions are known. |
| Formats        | `avif` + `webp` already enabled in `next.config.ts`. Source files: high-quality JPEG or PNG; avoid shipping huge PNGs for photos.                       |
| Remote images  | `remotePatterns: []` until a real CMS or asset host exists. No `*.githubusercontent.com` wildcard “just in case”.                                       |
| Cover aspect   | **16:10** for project cards (matches `ProjectCard`). Crop sources to that ratio before commit.                                                          |
| Article inline | Prefer full-bleed within the prose measure; width ≤ 2400px.                                                                                             |
| Favicons       | `app/icon.svg` / `apple-icon.png` (App Router file convention) or `public/` equivalents — one approach, not both.                                       |

### `sizes` hints (to apply when coding)

| Placement                   | `sizes`                                                     |
| --------------------------- | ----------------------------------------------------------- |
| Project card cover          | `(max-width: 768px) 100vw, 33vw` (already on `ProjectCard`) |
| Project detail hero         | `(max-width: 768px) 100vw, 80vw`                            |
| Blog card (if imaged later) | `(max-width: 768px) 100vw, 40vw`                            |
| MDX inline via `Img`        | `(max-width: 768px) 100vw, 42rem` (already set)             |

### Alt text

| Image                 | `alt`                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Project cover         | Concrete outcome or UI description from `cover.alt` (required in the type when `cover` is set) |
| Decorative atmosphere | Empty alt / `aria-hidden` (e.g. `AnimatedBackground`)                                          |
| Blog image            | Described in MDX; required for `Img`                                                           |

### LCP discipline

- Home featured project: cover is likely the LCP element — ensure the first
  featured card’s image has `priority` when the home page is built.
- Project detail hero: `priority` on the cover.
- Do **not** mark every image `priority`; that defeats the point.

---

## SEO strategy

### Objectives

1. **Name + role queries** — “{name} software engineer”
2. **Proof queries** — project titles and problem/outcome phrases
3. **Topic inbound** — blog posts for technical subjects you want to own
4. **Share previews** — every URL produces a correct OG card in Slack/LinkedIn

The site is not a content farm. Index quality over page count.

### Crawl & index

| Mechanism    | Plan                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `robots.ts`  | Allow `/`; disallow `/api/`. No need to disallow `(dev)` paths if they send `noIndex`.                                                                        |
| `sitemap.ts` | Emit `/`, `/projects`, each project slug, `/blog`, each published post. **Remove** obsolete `/work`, `/services`, `/about`, `/contact` entries when updating. |
| Drafts       | Excluded from sitemap and from production listings via the content layer.                                                                                     |
| Canonical    | Set per page through `createMetadata`.                                                                                                                        |

Priorities (suggested):

| Path               | priority | changefreq |
| ------------------ | -------- | ---------- |
| `/`                | 1.0      | monthly    |
| `/projects`        | 0.9      | monthly    |
| `/projects/[slug]` | 0.8      | yearly     |
| `/blog`            | 0.8      | weekly     |
| `/blog/[slug]`     | 0.6      | yearly     |

### Structured data (JSON-LD)

Already partially wired. Target graph:

| Page               | Types                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| All (root layout)  | `Person`, `WebSite`                                                                                          |
| `/projects/[slug]` | `CreativeWork` or `SoftwareSourceCode` with `author` → `Person`, `dateCreated` / year, `keywords` from stack |
| `/blog/[slug]`     | `BlogPosting` (helper already exists) with `headline`, `datePublished`, `dateModified`, `author`             |
| `/blog`            | Optional `Blog` collection; not required for v1                                                              |
| `/projects`        | Optional `ItemList`; not required for v1                                                                     |

Emit with the existing `<JsonLd />` component. One graph per page is enough;
do not duplicate `Person` on every article if the root layout already exposes
it — reference `@id` (`${siteConfig.url}/#person`).

### On-page SEO (content rules, not components)

| Page               | H1                                                 | Notes                                                |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------- |
| `/`                | One clear claim (tagline or outcome-led statement) | Follow with proof (projects), then writing, then ask |
| `/projects`        | “Projects” (or equivalent)                         | Cards carry the keywords via titles/summaries        |
| `/projects/[slug]` | Project title                                      | Then problem / approach / outcome as H2s             |
| `/blog`            | “Writing” / “Blog”                                 |                                                      |
| `/blog/[slug]`     | Post title                                         | MDX provides H2+; do not invent a second H1          |

Internal links:

- Home → featured projects + recent posts
- Project card → detail
- Blog card → article
- Every detail page → CTA (mailto/calendar) and a path back to its index
- Articles may link to projects where relevant (and the reverse)

### Performance as SEO

Core Web Vitals are ranking-relevant and conversion-relevant.

- Static generation for all five route types
- Self-hosted fonts (already)
- Image discipline above
- Server Components by default; client islands only for nav active state,
  mobile drawer, theme toggle, and any future interactive MDX widgets
- No analytics script until there is traffic to measure — and when added, load
  it in a way that does not block LCP

### Social / AI discoverability

- Accurate `Person.sameAs` (GitHub, LinkedIn, X) in JSON-LD
- Consistent name/role string across title, H1 areas, and schema
- Blog posts with real `description` frontmatter (enforced by Zod)

---

## Page composition map (for when coding starts)

Thin pages. No data fetching inside cards or sections.

### `/` — Home

Section order, copy brief and conversion rationale are in
[`HOMEPAGE.md`](./HOMEPAGE.md). Summary:

1. Hero — claim, availability, CTAs
2. Positioning — who I help
3. Selected work — featured `ProjectCard`s
4. How I work — engagement clarity
5. About — short bio + highlights
6. Writing — recent `BlogCard`s (omit if &lt; 2 posts)
7. Final CTA — mailto / calendar

### `/projects`

1. `SectionHeading`
2. Grid of all projects (featured first or by year descending)
3. Optional CTA

### `/projects/[slug]`

1. Back link to `/projects`
2. Header — title, client, year, role, stack, links
3. Metrics row
4. Problem / Approach / Outcome
5. Media (cover + optional gallery)
6. CTA

### `/blog`

1. `SectionHeading`
2. List or grid of `PostSummary`
3. Optional tag filter later (`?tag=`), not in v1 unless trivial

### `/blog/[slug]`

1. Article header — title, description, date, reading time, tags
2. `<MdxContent source={post.content} />`
3. Prev/next or “More writing”
4. CTA

---

## Implementation order (when you say go)

1. Update `navigation.ts` + `sitemap.ts` to the three-surface IA; add redirects
   from `/work/*`.
2. Build `/projects` and `/projects/[slug]` (proof first).
3. Build `/blog` and `/blog/[slug]` (MDX pipeline already exists).
4. Rebuild `/` as the conversion page composing featured work + writing + ask.
5. Add project/blog JSON-LD on detail pages; verify with rich-results testing.
6. Drop sample-only content; personalise `siteConfig`.

---

## Out of scope for this design

- Coding any `page.tsx` (explicitly deferred)
- Contact form / server actions (CTA is mailto/calendar in v1)
- CMS, i18n, auth
- Blog tag index routes (`/blog/tag/[tag]`)
- Project MDX bodies
