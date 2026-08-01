import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

type TechStackBadgeProps = {
  children: string;
  className?: string;
};

/**
 * A single tool chip — "TypeScript", "PostgreSQL", "Vercel".
 *
 * Thin wrapper over `<Tag>` so the stack on a project card and the stack on an
 * experience card are the same component, and so the visual language of "this
 * is a technology" stays distinct from interactive filters.
 */
export function TechStackBadge({ children, className }: TechStackBadgeProps) {
  return (
    <Tag data-slot="tech-stack-badge" className={cn("font-normal", className)}>
      {children}
    </Tag>
  );
}

type TechStackProps = {
  items: readonly string[];
  className?: string;
  /** Cap the number of chips shown; remainder renders as "+N". */
  max?: number;
};

/**
 * A row of tech chips. Used on project cards, experience cards and the about
 * page. Passing `max` keeps dense cards from growing a wall of tags.
 */
export function TechStack({ items, className, max }: TechStackProps) {
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? Math.max(0, items.length - max) : 0;

  if (items.length === 0) return null;

  return (
    <ul
      data-slot="tech-stack"
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {visible.map((item) => (
        <li key={item}>
          <TechStackBadge>{item}</TechStackBadge>
        </li>
      ))}
      {overflow > 0 ? (
        <li>
          <TechStackBadge className="text-text-subtle">{`+${overflow}`}</TechStackBadge>
        </li>
      ) : null}
    </ul>
  );
}
