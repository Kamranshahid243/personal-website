# `components/cards`

Content cards. Each takes a typed domain object and renders a consistent
preview used by listing pages and the home page.

| Component         | Input         |
| ----------------- | ------------- |
| `project-card`    | `Project`     |
| `blog-card`       | `PostSummary` |
| `service-card`    | `Service`     |
| `experience-card` | `Experience`  |

Whole-card hit targets use a stretched link on the title (`link-overlay`) so
the accessibility tree still sees one properly-labelled link — never a
card-shaped div with an `onClick`.
