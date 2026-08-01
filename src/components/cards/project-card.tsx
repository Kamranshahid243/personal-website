import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { TechStack } from "@/components/common/tech-stack";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
  /** Show the cover image when one exists. Defaults to true. */
  showCover?: boolean;
};

/**
 * Case study card.
 *
 * Outcome-first: the title and summary do the persuading, the year and stack
 * do the scanning. The whole card is clickable via a stretched link on the
 * title — one tab stop, one accessible name — rather than a card-shaped div
 * with an onClick.
 */
export function ProjectCard({
  project,
  className,
  showCover = true,
}: ProjectCardProps) {
  const href = `/projects/${project.slug}` as Route;
  const metric = project.metrics[0];

  return (
    <Card interactive className={cn("h-full", className)}>
      {showCover && project.cover ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-ui-slow group-hover/card:scale-[1.02]"
          />
        </div>
      ) : null}

      <CardHeader>
        <div className="flex items-center gap-2 font-mono text-caption text-text-subtle">
          <span>{project.client}</span>
          <span aria-hidden>·</span>
          <time dateTime={String(project.year)}>{project.year}</time>
        </div>
        <CardTitle>
          <Link href={href} className="link-overlay rounded-sm focus-ring">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>

      {metric ? (
        <CardContent>
          <p className="flex items-baseline gap-2">
            <span className="font-heading text-heading-md font-semibold tabular-nums">
              {metric.value}
            </span>
            <Text as="span" size="sm" tone="muted">
              {metric.label}
            </Text>
          </p>
        </CardContent>
      ) : null}

      <CardFooter>
        <TechStack items={project.stack} max={4} />
      </CardFooter>
    </Card>
  );
}
