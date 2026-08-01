# Architecture

This document explains what every folder in the repository is for and why it
exists. It is the reference to read before adding a file, so that the project
stays navigable as it grows.

The site has one commercial job: convince a recruiter, a founder or a business
owner to make contact. Several decisions below only make sense in that light —
why SEO and structured data are first-class, why case studies are typed as
`problem / approach / outcome`, and why the design token layer exists before a
single page does.

---

## Guiding principles

**One concern, one home.** Every kind of thing has exactly one obvious place to
live. When you are unsure where a file goes, the folder table below should
answer it in a few seconds; if it does not, the structure is wrong and should
change.

**Content is data, not markup.** Case studies, services and testimonials live
in typed collections; articles live in MDX with a validated frontmatter schema.
Nothing that could change without a deploy is hard-coded inside a component.

**Server by default.** Everything is a React Server Component unless it needs
state, effects or event handlers. Client boundaries are small, explicit and
pushed to the leaves — that is what keeps the JavaScript payload small and the
site fast on a mid-range phone.

**Design decisions are tokens.** Colour, type scale, spacing rhythm, easing
curves and elevation are declared once in CSS and referenced everywhere. This
is the difference between a site that feels designed and one that feels
assembled. The full system is documented in
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

**Pages compose, components style.** A raw `text-2xl` or `p-7` in a page file
is the design system failing. The fix is a token or a primitive, never an
inline exception.

---

## Top level

```
.
├── .github/workflows/   CI: typecheck, lint, format, build on every PR
├── .vscode/             Shared editor settings and extension recommendations
├── content/             MDX articles — the only content edited without touching code
├── docs/                This file, DESIGN-SYSTEM.md, and decision notes
├── public/              Static assets served verbatim from the site root
└── src/                 All application code
```

### `.github/workflows`

The quality gate. `ci.yml` runs `typecheck`, `lint`, `format:check` and a full
production `build` on every pull request. Having the build in CI matters more
than it looks: type errors that only appear during `next build` (server/client
boundary violations, invalid metadata) are exactly the ones that would
otherwise reach production.

### `.vscode`

Checked in deliberately. It pins the workspace TypeScript version, turns on
format-on-save with Prettier, and teaches the Tailwind IntelliSense extension
to look inside `cn()` and `cva()` calls. Editor setup that differs per machine
produces diff noise and "works on my machine" formatting arguments.

### `content`

Markdown/MDX articles, one file per post, in `content/blog`. Kept at the
repository root rather than inside `src` because it is content, not code: it is
authored, reviewed and merged like prose, and nothing in it is compiled by
TypeScript.

Articles are read at build time by `src/lib/content/blog.ts` and their
frontmatter is validated against a Zod schema, so a malformed date or a missing
description fails the build with the offending filename instead of shipping a
broken meta tag. Git is the CMS: posts are versioned, diffable and reviewable,
with no database and no editor subscription.

### `docs`

Written decisions. Architecture (this file) and the design system reference
now; a content style guide and any ADRs later. Documentation that lives outside
the repo goes stale the first week.

### `public`

Files served exactly as-is from the site root: `favicon.ico`, `icon.svg`,
`apple-icon.png`, the résumé PDF, `images/` for anything referenced from MDX or
content data. Nothing here is processed, hashed or optimised, so anything that
_should_ be optimised belongs in `src` and should go through `next/image`
instead.

---

## `src/app` — routes and route handlers

The App Router tree. Everything here maps to a URL or to a file the platform
serves; nothing else belongs in this folder. Pages stay thin: fetch, compose
sections, export metadata.

```
src/app/
├── (marketing)/         Route group: the commercial site, shared header/footer
├── (legal)/             Route group: privacy and terms, narrow layout, noindex
├── (dev)/design/        Design system reference. Internal tooling, noindex.
├── api/og/route.tsx     Dynamic Open Graph image generation
├── layout.tsx           Root document: fonts, providers, skip link, global JSON-LD
├── page.tsx             Temporary placeholder home route
├── not-found.tsx        404
├── error.tsx            Route-level error boundary
├── global-error.tsx     Last-resort boundary for root layout failures
├── sitemap.ts           Generated sitemap.xml
├── robots.ts            Generated robots.txt
└── manifest.ts          Generated web app manifest
```

**Route groups** (`(marketing)`, `(legal)`, `(dev)`) are folders whose names
never appear in a URL. Their entire purpose is to let sets of routes have
different layouts. Marketing pages need a header, a footer and a persistent
call to action; legal pages need a narrow prose column, no conversion furniture
and `noindex`; `(dev)` holds internal tooling that is not part of the public
site at all. Without groups, the marketing layout would have to branch on the
pathname to hide things — a small conditional that becomes a mess by the fifth
page.

**`(dev)/design`** renders every design token and primitive on one page, in
both themes. It is a working tool rather than a page: it is how a token change
gets reviewed before it reaches real content, and how a regression in a
primitive is spotted in seconds. Marked `noIndex` and absent from the sitemap.

**`layout.tsx`** is the document shell and stays a server component. It applies
the font variables, renders the skip link, mounts `<Providers>` and emits the
site-wide `Person` + `WebSite` structured data. `suppressHydrationWarning` on
`<html>` is required by next-themes, which writes the theme class before React
hydrates — that is what prevents a flash of the wrong theme.

**`error.tsx` vs `global-error.tsx`.** The first catches failures below the root
layout, so the header and footer survive and the visitor keeps their
navigation. The second only fires when the root layout itself throws, so it has
to render its own `<html>`/`<body>` and cannot assume the stylesheet or the
providers loaded — hence its inline styles.

**`sitemap.ts` / `robots.ts` / `manifest.ts`** are generated from the same
config and content layer the pages use, so a new article is discoverable the
moment it merges. A hand-maintained sitemap is a sitemap that is wrong.

**`api/og/route.tsx`** renders per-page share cards from JSX at the edge. A link
preview is the first impression a lead gets when someone drops your URL into a
Slack channel, which makes this conversion surface rather than decoration. Its
search params are validated and clamped, because they are attacker-controlled.

---

## `src/components` — the UI layers

Split by _stability and ownership_ rather than by page. Reading top to bottom,
each layer may import from the ones below it and never from the ones above.

```
src/components/
├── ui/           Design system primitives: Button, Card, Field, Typography…
├── layout/       Shell: Navbar, MobileNav, Footer, Container, Section
├── common/       Shared composites: social links, timeline, code window…
├── cards/        Content cards: Project, Blog, Service, Experience
├── sections/     Full-width page sections: Cta, …
├── forms/        React Hook Form + Zod forms
├── motion/       Framer Motion wrappers: Reveal, Stagger
├── mdx/          MDX rendering and element overrides
├── providers/    Client-side context providers
└── seo/          Structured data rendering
```

### `ui`

The design system's component layer, documented in full in
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md). Nothing here imports from `@/config`,
`@/data` or `@/lib/content` — a primitive knows nothing about this site, which
is what makes it reusable and what keeps the layering honest.

Most files start as shadcn/ui output from `pnpm ui:add <component>`. Their
**structure and behaviour stay upstream** — the Radix wiring, the `data-slot`
attributes, `asChild` — so an accessibility fix upstream can be pulled in by
re-running the CLI and reading the diff. Their **variant tables are ours** and
are bound to the design tokens; the shadcn preset is tuned for dashboard
density, and retuning it belongs in one variant table rather than in a
`className` on every call site.

The rest (`typography`, `link`, `tag`, `icon`, `spinner`) have no shadcn
equivalent and are ours outright.

### `layout`

The site shell. `Navbar` is a server component with two client islands
(`NavLinks` for active state, `MobileNav` for the drawer). `Footer` is fully
server-side. Both read from `src/config/navigation`, so a new page is added
once. `Container` and `Section` own horizontal measure and vertical rhythm —
every section rendering `<Container>` is why the left edge of text lines up
perfectly from the top of the page to the bottom.

### `common`

Composites built _from_ `ui` that know about this site: `theme-toggle`,
`social-links`, `availability-badge`, `section-heading`, `skill-badge`,
`tech-stack`, `timeline`, `code-window`, `animated-background`. The pressure
valve that keeps `ui` clean: the moment you want to add a site-specific prop to
a design-system primitive, the wrapper goes here instead.

### `cards`

Typed content cards — `ProjectCard`, `BlogCard`, `ServiceCard`,
`ExperienceCard`. Each takes a domain object and renders a consistent preview.
Whole-card hit targets use a stretched link on the title so the accessibility
tree still sees one properly-labelled link.

### `sections`

Self-contained, full-width page sections. A page composes sections; it never
lays out cards itself. Because a section takes its content as props, the same
`<CtaSection />` can close the home page, the services page and every case
study without duplication, and a page file stays short enough to read in one
screen.

Sections never fetch data — it arrives from the page — which keeps them
trivially previewable.

### `forms`

Forms get their own folder because they are the one place three concerns meet:
React Hook Form for state, a Zod schema from `lib/validations` for rules, and a
server action from `src/server/actions` for submission. Keeping that wiring in
one predictable place stops it being reinvented per form.

### `motion`

Thin wrappers over Framer Motion — `Reveal` for scroll-triggered entrances,
`Stagger` for lists — built on the shared curves in `lib/motion.ts`.

Two reasons this layer exists. First, consistency: motion that varies per
component reads as unpolished, and centralising it means every section enters
the same way. Second, accessibility: both wrappers check `useReducedMotion()`
and render statically when the visitor has asked for reduced motion, so
respecting that preference is the default rather than something to remember.

### `mdx`

`mdx-content.tsx` compiles an article body; `mdx-components.tsx` maps markdown
elements onto app components. The mapping is what lets an author write plain
markdown and still get client-side navigation on internal links and optimised
images — they never have to think about `next/link`.

`MdxContent` is a server component, so the markdown parser, the plugin chain
and the Shiki highlighter all run at build time. The browser receives finished
HTML and downloads none of it.

### `providers`

Every app-wide context provider, composed in one file. The root layout mounts
`<Providers>` and stays a readable document shell; adding an analytics or query
provider later touches exactly one file. Each provider marks its own client
boundary, so server-rendered children passed through remain server-rendered.

### `seo`

Renders the structured data built in `lib/seo/json-ld.ts`. Separate from `lib`
because this is the React half — the part that puts a `<script>` in the
document — while `lib` owns the data.

---

## `src/config` — who this site is about

```
src/config/
├── site.ts        Name, role, tagline, contact, socials, availability
└── navigation.ts  Main nav, primary CTA, footer sections
```

Personal details are referenced by the header, the footer, metadata, JSON-LD,
the sitemap and the OG generator. Centralising them means changing a handle or
an email is a one-line edit rather than a grep.

Navigation is config rather than markup for the same reason: the desktop nav,
the mobile sheet and the footer all render from one list and cannot drift
apart. Its ordering is a conversion decision — proof of work first, then the
offer, then credibility, then the ask.

---

## `src/data` — curated content

```
src/data/
├── projects.ts      Case studies
├── services.ts      Packaged freelance offers
├── testimonials.ts  Attributed social proof
├── experience.ts    Career history
└── faq.ts           Objection handling
```

Structured content that is too relational for MDX and too small for a database.
Each file is a typed array matching an interface in `src/types/content.ts`, so
adding an entry is guided by autocomplete and a missing field is a build error.

The shapes encode the site's commercial argument. A `Project` is
`problem / approach / outcome` plus quantified `metrics`, because that is the
structure that persuades a founder and the part a recruiter skims. A `Service`
carries concrete deliverables and a price anchor, because a named, scoped offer
converts far better than an open-ended "hire me".

Every collection is currently an empty typed array. The contract exists; the
content is yours to write. If a collection later outgrows a file, it moves
behind the same interface and no page changes.

---

## `src/hooks` — reusable client behaviour

Client-side React hooks, one per file, named `use-*.ts`. Currently
`use-mounted` (SSR-safe mount detection) and `use-media-query` (viewport-driven
_behaviour_, such as swapping a dropdown for a bottom sheet — responsive
_styling_ stays in Tailwind breakpoints, which cost nothing and work before
hydration).

There is no barrel `index.ts`, here or anywhere else in `src`. Barrels defeat
tree-shaking, slow down HMR and create import cycles that are painful to unpick
later; the small cost is one extra path segment in an import.

---

## `src/lib` — framework-agnostic logic

```
src/lib/
├── utils.ts        cn(): clsx + tailwind-merge
├── fonts.ts        next/font setup
├── motion.ts       Shared transitions and variants
├── content/        Reading and validating MDX (blog.ts, schema.ts)
├── mdx/            The remark/rehype compilation pipeline
├── seo/            Metadata and structured data builders
└── validations/    Zod schemas shared by client and server
```

Everything here is a pure module: no JSX, no side effects at import time beyond
configuration. That makes each piece independently testable and keeps
components free of logic that has nothing to do with rendering.

**`content/`** is the file-system content layer. `blog.ts` is marked
`server-only`, which makes it a build error to import from a client component —
the guardrail that stops `node:fs` ending up in a browser bundle. Every reader
is wrapped in React's `cache()`, so a page that needs both a post and the post
list touches the disk once.

**`mdx/`** holds the plugin chain: GitHub-flavoured markdown, heading slugs and
anchors, and Shiki highlighting compiled into CSS variables for both themes at
once. Theme switching is therefore instant and costs nothing at runtime.

**`seo/`** is where `createMetadata()` lives. Every page calls it instead of
hand-writing a `Metadata` object, which is what guarantees canonical URLs, OG
tags and Twitter cards are never accidentally omitted on the one page that
actually gets shared. `json-ld.ts` builds Schema.org graphs typed by
`schema-dts`, so invalid markup is a compile error.

**`validations/`** holds Zod schemas used in three places at once: as the React
Hook Form resolver, as the server action's input guard, and as the source of
the TypeScript type. One definition is what makes client and server validation
impossible to desynchronise — and the server check is the one that matters,
since the client one can always be bypassed.

---

## `src/server` — code that must never reach the browser

```
src/server/
├── actions/   "use server" mutations (contact form, newsletter)
└── mail/      Transport-agnostic mail port
```

Everything here is server-only and reviewed as such: each file in `actions/` is
a public, unauthenticated endpoint the moment it deploys. Grouping them means
the site's entire server-side surface area is visible in one directory listing
rather than scattered beside the components that call them.

Actions follow a fixed shape: re-validate the input with the shared Zod schema,
check the honeypot and rate limit, call a service, return a plain serialisable
result. They depend on the `Mailer` interface rather than a vendor SDK, so
switching email provider is a new file in `mail/` and one line in
`getMailer()` — no page or action changes.

---

## `src/styles` — the design system

```
src/styles/
├── globals.css          Entry point; also the shadcn-owned colour block
├── tokens/
│   ├── color.css        Palette, semantic roles, light and dark themes
│   ├── typography.css   Families, weights, tracking, leading, the type scale
│   ├── spacing.css      Spacing scale, containers, breakpoints, z-index
│   ├── radius.css       One base radius and its derived steps
│   ├── elevation.css    Theme-aware shadows
│   ├── motion.css       Durations, easings, keyframes
│   └── component.css    Control, field, card, tag, icon, focus tokens
├── base.css             Element-level defaults
├── utilities.css        Shared @utility definitions
└── prose.css            Long-form MDX/article styles
```

One file per token category, so "where is the type scale defined" has an
obvious answer. The full rationale for each is in
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md); what matters architecturally is the
split by _ownership_: the `@theme inline` / `:root` / `.dark` blocks in
`globals.css` are appended to by the shadcn CLI whenever a new primitive needs
a colour token, so keeping the design system in `tokens/` means a CLI upgrade
can never clobber it.

Tokens declared inside `@theme` become Tailwind utilities automatically, which
is why `--text-display-lg` is usable as `text-display-lg` and
`--spacing-section` as `py-section`. Component-level tokens are plain `:root`
properties instead, consumed through `h-(--btn-h)` — a page has no business
writing `--btn-h`, so it should not be a global utility.

**`base.css`** covers only what should be true without a class: antialiasing,
smooth scrolling with `scroll-padding-top` clear of the sticky header, balanced
heading wraps, a global `:focus-visible` fallback so nothing can ship without a
focus indicator, and a `prefers-reduced-motion` override.

**`utilities.css`** holds the cross-cutting behaviours — `focus-ring`,
`transition-ui`, `hover-lift`, `container-page`, `surface`. This is where most
of the deduplication lives: every focus ring on the site is one utility, so the
treatment changes globally in four lines.

**`prose.css`** styles `.prose` by hand rather than pulling in
`@tailwindcss/typography`, which ships opinions for a dozen elements this site
will never use. Every value is a design token, so an article inherits the
site's type scale instead of running a parallel one. It also styles the
`rehype-pretty-code` output, reading `--shiki-light` or `--shiki-dark`
depending on the active theme.

---

## `src/types` — shared type definitions

```
src/types/
├── content.ts  Project, Service, Testimonial, Experience, Faq
└── blog.ts     Post and PostSummary
```

Only types shared across module boundaries live here; a type used in one file
stays in that file. `blog.ts` derives from the Zod frontmatter schema
(`z.infer`) rather than restating it, so the validation rules and the types can
never disagree.

---

## `src/env.ts`

Environment variables parsed and validated with Zod at module load. A missing
or malformed variable fails the build with a readable message instead of
surfacing as `undefined` in production — the classic way a deployed site ends
up with `http://localhost:3000` in its canonical tags. Import `env` rather than
touching `process.env` anywhere else; it is the only way the types stay honest.

---

## Configuration files

| File                  | Why it exists                                                                      |
| --------------------- | ---------------------------------------------------------------------------------- |
| `next.config.ts`      | Security headers, image formats, `typedRoutes`, barrel-import optimisation         |
| `tsconfig.json`       | Strict mode plus `noUncheckedIndexedAccess`; `@/*` path alias                      |
| `eslint.config.mjs`   | Flat config: Next core-web-vitals + TypeScript, with `eslint-config-prettier` last |
| `prettier.config.mjs` | Formatting, plus Tailwind class sorting that also reads `cn()` and `cva()`         |
| `postcss.config.mjs`  | Wires the Tailwind v4 engine                                                       |
| `components.json`     | Tells the shadcn CLI where components, utils and the stylesheet live               |
| `.env.example`        | The documented environment contract; the real values go in untracked `.env.local`  |
| `.nvmrc`              | Pins the Node version for CI and for contributors                                  |
| `.editorconfig`       | Line endings and indentation for editors that do not read the Prettier config      |

Two choices worth calling out.

`typedRoutes` is enabled, which generates a union of every real route and turns
a typo in a `<Link href>` into a compile error. Navigation hrefs in
`config/navigation.ts` are typed as `string` for now because the pages they
point at do not exist yet; narrowing them to `Route` once the route tree is
real is a one-line change and is worth doing.

`eslint-config-prettier` is applied last in the flat config array so that every
rule that would fight the formatter is switched off. Order matters here — put
it anywhere else and the two tools will disagree forever.

---

## Where new code goes

| You are adding…                         | It goes in                             |
| --------------------------------------- | -------------------------------------- |
| A new page                              | `src/app/(marketing)/<route>/page.tsx` |
| A reusable page block                   | `src/components/sections/`             |
| A card, badge or small composite        | `src/components/common/`               |
| A design system primitive               | `src/components/ui/`                   |
| A colour, size, spacing or easing value | `src/styles/tokens/`                   |
| A blog post                             | `content/blog/<slug>.mdx`              |
| A case study or service                 | `src/data/`                            |
| A form validation rule                  | `src/lib/validations/`                 |
| Anything that sends or writes           | `src/server/actions/`                  |
| A personal detail or a nav link         | `src/config/`                          |

---

## What is intentionally not here yet

Left out until there is a concrete reason, because unused abstractions are
liabilities:

- **A testing setup.** Vitest plus Testing Library for `src/lib`, and Playwright
  for the contact flow, are worth adding once there is behaviour to protect.
  There is currently none.
- **Analytics.** One script, added when the site is live and there is traffic to
  measure. It will need a CSP nonce in middleware at that point.
- **A CMS.** The typed collections in `src/data` and the MDX in `content` are
  the right level of ceremony for a personal site. Both are already shaped so a
  CMS can slot in behind the same interfaces if that ever changes.
- **i18n.** Adds a routing dimension to every page. Only worth it with a real
  second-language audience.
