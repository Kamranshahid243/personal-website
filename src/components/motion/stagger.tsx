"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

import { revealViewport, riseVariants, staggerVariants } from "@/lib/motion";

type StaggerProps = ComponentProps<typeof motion.div> & {
  children: ReactNode;
  /** Seconds between each child. */
  interval?: number;
  delay?: number;
};

/**
 * Walks a list of children into view one after another.
 *
 * Used for card grids, nav items and feature lists. The parent owns the
 * timing; each child only declares that it participates by being a
 * `<Stagger.Item>`, which keeps the sequencing logic in one place.
 */
export function Stagger({
  children,
  interval = 0.06,
  delay = 0,
  ...props
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as ComponentProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerVariants(interval, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<
  ComponentProps<typeof motion.div>,
  "children" | "variants"
> & {
  children: ReactNode;
};

function StaggerItem({ children, ...props }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as ComponentProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div variants={riseVariants} {...props}>
      {children}
    </motion.div>
  );
}

Stagger.Item = StaggerItem;
