# `components/sections`

Full-width, self-contained page sections.

| Component | Role                       |
| --------- | -------------------------- |
| `cta`     | End-of-page call to action |

A section owns its vertical rhythm by rendering `<Section>` and `<Container>`.
It never fetches — data arrives as props from the page — so sections stay
trivially previewable. Anything reused across two sections moves down to
`components/common` or `components/cards`.
