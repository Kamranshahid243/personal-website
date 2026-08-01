# `(marketing)` route group

A route group: the parentheses mean the folder name never appears in a URL. It
exists purely to give public routes a shared layout — the sticky `<Navbar />`,
the `<main id="main">` landmark the skip link targets, and the `<Footer />`.

## Public routes (v1)

| Path               | File                       | Job                                           |
| ------------------ | -------------------------- | --------------------------------------------- |
| `/`                | `page.tsx`                 | Pitch: claim, featured projects, writing, ask |
| `/projects`        | `projects/page.tsx`        | Full project index                            |
| `/projects/[slug]` | `projects/[slug]/page.tsx` | Case study detail                             |
| `/blog`            | `blog/page.tsx`            | Writing index                                 |
| `/blog/[slug]`     | `blog/[slug]/page.tsx`     | MDX article                                   |

Contact is not a page in v1 — the primary CTA is `mailto:` or a calendar URL.
Legal, about and services are out of scope for this IA.

Full routing, layout, metadata, image and SEO plan:
[`docs/SITE-ARCHITECTURE.md`](../../../docs/SITE-ARCHITECTURE.md).

Pages here should stay thin — data in from `src/data` or `src/lib/content`,
composition of `src/components/sections` and `src/components/cards`, metadata
out via `createMetadata()`.
