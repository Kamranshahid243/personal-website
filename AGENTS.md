# AGENTS.md

## Cursor Cloud specific instructions

This is a personal website built with Vite + React + TypeScript. Dependencies are managed with `pnpm` (Node 22).

- Standard scripts are defined in `package.json` and documented in `README.md`: `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm typecheck`.
- The dev server (`pnpm dev`) runs on port `5173` and is configured with `host: true` in `vite.config.ts`, so it is reachable in the VM at `http://localhost:5173/`. It is a long-running process — start it in a background/tmux session, not a blocking foreground call.
- `esbuild` (a transitive dependency of Vite) requires its install script to run. It is allowlisted non-interactively via `pnpm.onlyBuiltDependencies` in `package.json`, so a normal `pnpm install` is sufficient — do not run the interactive `pnpm approve-builds`.
- There are no automated unit tests and no backend/database; this is a static front-end SPA. Verify changes with `pnpm lint` + `pnpm build` and by loading the site in a browser.
