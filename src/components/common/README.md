# `components/common`

Composite components shared across sections and pages, built from the design
system primitives in `components/ui`:

| Component             | Role                                           |
| --------------------- | ---------------------------------------------- |
| `theme-toggle`        | Light / dark / system switcher                 |
| `social-links`        | GitHub, LinkedIn, X, email from `siteConfig`   |
| `social-icons`        | Inline brand SVGs (Lucide dropped brand marks) |
| `availability-badge`  | Open / limited / closed, driven by config      |
| `section-heading`     | Eyebrow + heading + subheading composition     |
| `skill-badge`         | Capability chip for the about page             |
| `tech-stack`          | Tool chips for project and experience cards    |
| `timeline`            | CSS-only vertical rail                         |
| `code-window`         | Editor chrome around a snippet                 |
| `animated-background` | CSS-only dots / grid / glow atmospheres        |

The line against `components/ui` matters: `ui` is the design system and knows
nothing about this site. Anything here is free to import from `@/config`,
`@/data` and `@/lib`.
