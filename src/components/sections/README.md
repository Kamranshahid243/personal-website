# `components/sections`

Full-width, self-contained page sections.

| Component             | Role                                     |
| --------------------- | ---------------------------------------- |
| `hero`                | Homepage orientation — brand, claim, CTA |
| `about`               | Positioning / bio depth                  |
| `services`            | Packaged freelance offers                |
| `skills`              | Capability chips                         |
| `experience`          | Career timeline                          |
| `featured-projects`   | Selected case studies                    |
| `development-process` | How engagements run                      |
| `tech-stack`          | Tooling by category                      |
| `why-work-with-me`    | Differentiators                          |
| `latest-blog-posts`   | Recent writing                           |
| `contact-cta`         | Homepage closing ask                     |
| `cta`                 | Reusable end-of-page call to action      |

A section owns its vertical rhythm by rendering `<Section>` and `<Container>`
(or a semantic `<header>` for the hero). It never fetches — data arrives as
props from the page — so sections stay trivially previewable. Anything reused
across two sections moves down to `components/common` or `components/cards`.
