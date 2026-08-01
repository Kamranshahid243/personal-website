"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect` so React
 * reads the value in a tear-free way and the server snapshot is explicit.
 *
 * Use only for behaviour that CSS genuinely cannot express — swapping a
 * dropdown for a bottom sheet, for instance. Responsive *styling* belongs in
 * Tailwind breakpoints, which cost nothing and work before hydration.
 */
export function useMediaQuery(query: string): boolean {
  function subscribe(onChange: () => void) {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // The server has no viewport; assume the mobile-first branch.
    () => false,
  );
}
