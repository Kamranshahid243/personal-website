# personal-website

A modern personal website built with [Vite](https://vite.dev/), [React](https://react.dev/), and TypeScript.

## Getting started

Install dependencies (uses [pnpm](https://pnpm.io/)):

```bash
pnpm install
```

### Available scripts

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Start the Vite dev server at `http://localhost:5173` |
| `pnpm build`     | Type-check and build the production bundle          |
| `pnpm preview`   | Preview the production build locally                |
| `pnpm lint`      | Run ESLint over the project                          |
| `pnpm typecheck` | Run the TypeScript compiler without emitting files  |

## Project structure

```
src/
  components/   Reusable UI sections (Hero, About, Projects, Guestbook, Footer)
  App.tsx       Page composition + theme toggle
  main.tsx      React entry point
  index.css     Global styles / design tokens
  App.css       Component styles
```
