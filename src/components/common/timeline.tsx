import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type TimelineProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"ol">, "children">;

/**
 * Vertical timeline rail.
 *
 * Pure structure: a list with a continuous hairline and a marker per item.
 * Content (an `<ExperienceCard>`, a milestone, anything) is passed as children
 * of `<Timeline.Item>`, so the rail never knows what it is framing.
 *
 * CSS only — no intersection observers, no scroll-linked animation. The rail
 * is always visible, which is clearer than a line that draws itself.
 */
export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      className={cn("relative grid gap-(--spacing-stack-lg)", className)}
      {...props}
    >
      {children}
    </ol>
  );
}

type TimelineItemProps = {
  children: ReactNode;
  /** Optional label rendered beside the marker, e.g. a year. */
  label?: ReactNode;
  className?: string;
};

function TimelineItem({ children, label, className }: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(
        "relative grid gap-3 pl-8",
        // Continuous rail. The last item still draws to its own midpoint so
        // the line does not look truncated above the final marker.
        "before:absolute before:top-2 before:bottom-[-1.5rem] before:left-[0.4375rem] before:w-px before:bg-line last:before:bottom-auto last:before:h-3",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-line-strong bg-surface"
      />
      {label ? (
        <div className="font-mono text-caption text-text-subtle">{label}</div>
      ) : null}
      {children}
    </li>
  );
}

Timeline.Item = TimelineItem;
