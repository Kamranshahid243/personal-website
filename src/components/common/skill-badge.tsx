import type { ComponentProps, ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type SkillBadgeProps = {
  children: ReactNode;
  /** Optional Lucide icon rendered before the label. */
  icon?: LucideIcon;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;

/**
 * A capability chip for the about page and skills grid.
 *
 * Larger and quieter than a `<Tag>`: skills are a statement of range, not
 * taxonomy, so they do not look clickable. Prefer `<TechStackBadge>` for the
 * tools used on a specific project.
 */
export function SkillBadge({
  children,
  icon,
  className,
  ...props
}: SkillBadgeProps) {
  return (
    <span
      data-slot="skill-badge"
      className={cn(
        "inline-flex items-center gap-2 rounded-(--radius-lg) border border-line",
        "bg-surface-sunken px-3 py-2 text-body-sm font-medium text-text",
        className,
      )}
      {...props}
    >
      {icon ? <Icon icon={icon} size="sm" tone="muted" /> : null}
      {children}
    </span>
  );
}
