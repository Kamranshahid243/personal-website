import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary for Framer Motion.
 *
 * These values mirror the CSS tokens in `src/styles/tokens/motion.css` exactly,
 * so a JS-driven entrance and a CSS hover on the same element agree. Two motion
 * systems with different timings is one of the more expensive kinds of
 * inconsistency to notice and the easiest to avoid.
 *
 * House style: short, decelerating, never bouncy. Motion should confirm an
 * action, not perform one.
 */

/** Mirrors `--ease-out-expo`. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
/** Mirrors `--ease-out-quart`. */
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

/** Seconds. Mirrors the `--duration-*` tokens. */
export const durations = {
  instant: 0.1,
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.7,
} as const;

export const transitions = {
  fast: { duration: durations.fast, ease: easeOutQuart },
  base: { duration: durations.base, ease: easeOutQuart },
  slow: { duration: durations.slow, ease: easeOutExpo },
  slower: { duration: durations.slower, ease: easeOutExpo },
} satisfies Record<string, Transition>;

/** Fade and rise. The default entrance for anything that scrolls into view. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.slower },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

/**
 * Parent variant that walks its children in. Pair with `riseVariants` on each
 * child; children inherit the `visible` state automatically.
 */
export function staggerVariants(stagger = 0.06, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Viewport config for scroll-triggered reveals: fire once, slightly early. */
export const revealViewport = { once: true, margin: "0px 0px -15% 0px" };
