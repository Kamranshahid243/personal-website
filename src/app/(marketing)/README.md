# `(marketing)` route group

A route group: the parentheses mean the folder name never appears in a URL. It
exists purely to give a set of routes a shared layout — the sticky `<Navbar />`,
the `<main id="main">` landmark the skip link targets, and the `<Footer />`.

Planned routes:

| Path           | File                   | Job it does                                      |
| -------------- | ---------------------- | ------------------------------------------------ |
| `/`            | `page.tsx`             | The pitch: outcome, proof, offer, call to action |
| `/work`        | `work/page.tsx`        | Case study index                                 |
| `/work/[slug]` | `work/[slug]/page.tsx` | One case study                                   |
| `/services`    | `services/page.tsx`    | Packaged freelance offers                        |
| `/about`       | `about/page.tsx`       | Credibility: experience, stack, how you work     |
| `/blog`        | `blog/page.tsx`        | Writing index                                    |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | Article                                          |
| `/contact`     | `contact/page.tsx`     | The ask                                          |

Pages here should stay thin — data in from `src/data` or `src/lib/content`,
composition of `src/components/sections` and `src/components/cards`, metadata
out via `createMetadata()`.
