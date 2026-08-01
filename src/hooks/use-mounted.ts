"use client";

import { useSyncExternalStore } from "react";

/** The value never changes after hydration, so nothing needs to subscribe. */
const noopSubscribe = () => () => {};

/**
 * `false` while server-rendering and during hydration, `true` afterwards.
 *
 * The standard escape hatch for anything whose correct output is unknowable on
 * the server — the resolved theme being the obvious case. Rendering a
 * placeholder until this flips avoids a hydration mismatch without opting the
 * whole subtree out of SSR.
 *
 * Implemented with `useSyncExternalStore` rather than the more familiar
 * `useState` + `useEffect` pair: React reads the server and client snapshots
 * directly instead of scheduling a second render, so there is no cascading
 * update.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
