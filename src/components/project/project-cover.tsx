import Image from "next/image";

import type { Project, ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

const categoryAccent: Record<
  ProjectCategory,
  { from: string; via: string; to: string; grid: string }
> = {
  Performance: {
    from: "color-mix(in oklch, var(--color-brand-500) 42%, transparent)",
    via: "color-mix(in oklch, var(--color-brand-700) 18%, transparent)",
    to: "var(--color-surface-sunken)",
    grid: "opacity-40",
  },
  Product: {
    from: "color-mix(in oklch, var(--color-brand-400) 36%, transparent)",
    via: "color-mix(in oklch, var(--color-brand-800) 16%, transparent)",
    to: "var(--color-surface-sunken)",
    grid: "opacity-35",
  },
  "Design System": {
    from: "color-mix(in oklch, var(--color-brand-300) 40%, transparent)",
    via: "color-mix(in oklch, var(--color-brand-600) 20%, transparent)",
    to: "var(--color-surface-sunken)",
    grid: "opacity-45",
  },
  Platform: {
    from: "color-mix(in oklch, var(--color-brand-600) 38%, transparent)",
    via: "color-mix(in oklch, var(--color-brand-900) 22%, transparent)",
    to: "var(--color-surface-sunken)",
    grid: "opacity-30",
  },
  "Developer Tools": {
    from: "color-mix(in oklch, var(--color-brand-500) 30%, transparent)",
    via: "color-mix(in oklch, var(--color-brand-800) 24%, transparent)",
    to: "var(--color-surface-sunken)",
    grid: "opacity-50",
  },
};

type ProjectCoverProps = {
  project: Pick<Project, "title" | "category" | "cover" | "client">;
  className?: string;
  priority?: boolean;
  /** Aspect ratio utility classes. Defaults to 16/10 card framing. */
  aspectClassName?: string;
};

/**
 * Project media plane.
 *
 * Prefers a real cover image when `cover.src` is set. Otherwise renders a
 * category-tuned composition so the index never looks empty while assets land.
 */
export function ProjectCover({
  project,
  className,
  priority = false,
  aspectClassName = "aspect-[16/10]",
}: ProjectCoverProps) {
  const accent = categoryAccent[project.category];
  const initials = project.client
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      data-slot="project-cover"
      className={cn(
        "relative isolate overflow-hidden bg-surface-sunken",
        aspectClassName,
        className,
      )}
    >
      {project.cover.src ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
          className="object-cover transition-ui-slow group-hover/card:scale-[1.03]"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 transition-ui-slow group-hover/card:scale-[1.03]"
            style={{
              backgroundImage: `
                radial-gradient(90% 70% at 12% 18%, ${accent.from}, transparent 58%),
                radial-gradient(80% 65% at 88% 82%, ${accent.via}, transparent 55%),
                linear-gradient(160deg, color-mix(in oklch, var(--color-surface) 55%, var(--color-brand-100)), ${accent.to})
              `,
            }}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-dot-grid mask-fade-out",
              accent.grid,
            )}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-surface-sunken/50 to-transparent"
          />
          <div className="absolute inset-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <span className="font-mono text-caption tracking-[0.14em] text-text-subtle uppercase">
              {project.category}
            </span>
            <span className="font-heading text-heading-lg font-semibold tracking-tight text-text/20 select-none">
              {initials || "PR"}
            </span>
          </div>
          <span className="sr-only">{project.cover.alt}</span>
        </>
      )}
    </div>
  );
}
