"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

import { revealViewport, riseVariants, transitions } from "@/lib/motion";

type RevealProps = Omit<
  ComponentProps<typeof motion.div>,
  "variants" | "initial" | "whileInView"
> & {
  children: ReactNode;
  /** Seconds. Use for a short manual sequence; prefer `<Stagger>` for lists. */
  delay?: number;
};

/**
 * Scroll-triggered entrance.
 *
 * The single reveal primitive for the whole site, so section entrances behave
 * identically everywhere and page code stays free of animation config.
 *
 * When the visitor has asked for reduced motion the children render
 * immediately, with no transform at all — degrading to a faster animation is
 * not the same thing as respecting the preference.
 */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as ComponentProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      variants={riseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ ...transitions.slower, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
