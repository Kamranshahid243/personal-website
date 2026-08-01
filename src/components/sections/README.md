# `components/sections`

Full-width, self-contained page sections: `hero.tsx`, `featured-work.tsx`,
`services-grid.tsx`, `testimonials.tsx`, `cta.tsx`, and so on.

This layer is what keeps page files short. A page composes sections; it does
not lay out cards. Because sections take their content as props (or read it
from `src/data`), the same `<Cta />` can close the home page, the services page
and every case study without being copied.

Rules of thumb:

- A section owns its vertical rhythm by rendering `<Section>` and `<Container>`.
- A section never fetches. Data arrives as props from the page, so sections
  stay trivially previewable and testable.
- Anything reused across two sections moves down to `components/common`.
