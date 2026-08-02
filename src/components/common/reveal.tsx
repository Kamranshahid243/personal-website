"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  /** Extra delay before the reveal starts once in view (ms). */
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Reliable scroll entrance — IntersectionObserver so motion works in every
 * modern browser, not only those with CSS scroll-driven animations.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  className,
  children,
  style,
  ...props
}: RevealProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={cn("reveal-io", visible && "is-visible", className)}
      style={{
        ...(typeof style === "object" && style ? style : {}),
        ["--reveal-delay" as string]: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
