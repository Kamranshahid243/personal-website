# `(marketing)` route group

A route group: the parentheses mean the folder name never appears in a URL. It
exists purely to give a set of routes a shared layout.

Everything a visitor sees on their way to hiring you lives here, under one
`layout.tsx` that renders the header, the `<main id="main">` landmark the skip
link targets, and the footer.

Planned routes:

| Path           | File                   | Job it does                                      |
| -------------- | ---------------------- | ------------------------------------------------ |
| `/`            | `page.tsx`             | The pitch: outcome, proof, offer, call to action |
| `/work`        | `work/page.tsx`        | Case study index                                 |
| `/work/[slug]` | `work/[slug]/page.tsx` | One case study, problem → approach → outcome     |
| `/services`    | `services/page.tsx`    | Packaged freelance offers and pricing anchors    |
| `/about`       | `about/page.tsx`       | Credibility: experience, stack, how you work     |
| `/blog`        | `blog/page.tsx`        | Writing index, from `content/blog`               |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | Article, rendered with `<MdxContent />`          |
| `/contact`     | `contact/page.tsx`     | The ask: form, availability, response time       |

Pages here should stay thin — data in from `src/data` or `src/lib/content`,
composition of `src/components/sections`, metadata out via `createMetadata()`.
