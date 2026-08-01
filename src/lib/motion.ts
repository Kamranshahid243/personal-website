import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Animation is a design token like any other. Centralising the curves and
 * durations here is what makes movement across the site feel like one hand
 * made it, and it keeps individual components from inventing their own
 * timings.
 *
 * House style, borrowed from the Linear/Vercel school: short, decelerating,
 * never bouncy. Motion should confirm an action, not perform.
 */

/** Mirrors `--ease-out-expo` in tokens.css. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const transitions = {
  fast: { duration: 0.15, ease: easeOutExpo },
  base: { duration: 0.35, ease: easeOutExpo },
  slow: { duration: 0.6, ease: easeOutExpo },
} satisfies Record<string, Transition>;

/** Fade and rise. The default entrance for anything that scrolls into view. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

/**
 * Parent variant that walks its children in. Pair with `riseVariants` on each
 * child; the children inherit the `visible` state automatically.
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
