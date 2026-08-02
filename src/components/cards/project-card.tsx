import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { ProjectCover } from "@/components/project/project-cover";
import { GitHubIcon } from "@/components/common/social-icons";
import { TechStack } from "@/components/common/tech-stack";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Text } from "@/components/ui/typography";
import type { Project } from "@/types/content";
import { isUsableHref } from "@/lib/links";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
  /** Show the cover plane. Defaults to true. */
  showCover?: boolean;
};

/**
 * Case study card — outcome first.
 *
 * Metric and title do the persuading; problem and stack support the scan.
 * The case-study link stretches across the card; external actions sit above
 * the overlay so they remain independently reachable.
 */
export function ProjectCard({
  project,
  className,
  showCover = true,
}: ProjectCardProps) {
  const href = `/projects/${project.slug}` as Route;
  const metric = project.metrics[0];
  const hasGitHub = isUsableHref(project.links.repository);
  const hasLive = isUsableHref(project.links.live);

  return (
    <Card
      interactive
      padding="none"
      className={cn("h-full gap-0 overflow-hidden", className)}
    >
      {showCover ? (
        <ProjectCover project={project} className="border-b border-line" />
      ) : null}

      <CardHeader className="pt-(--card-padding)">
        <div className="flex flex-wrap items-center gap-2">
          <Tag variant="brand">{project.category}</Tag>
          <span className="font-mono text-caption text-text-muted">
            <span>{project.client}</span>
            <span aria-hidden className="mx-1.5">
              ·
            </span>
            <time dateTime={String(project.year)}>{project.year}</time>
          </span>
        </div>
        <CardTitle as="h2" className="mt-1">
          <Link href={href} className="link-overlay rounded-sm focus-ring">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {metric ? (
          <p className="flex items-baseline gap-2">
            <span className="font-heading text-heading-md font-semibold tabular-nums">
              {metric.value}
            </span>
            <Text as="span" size="sm" tone="muted">
              {metric.label}
            </Text>
          </p>
        ) : null}

        <Text as="p" size="sm" tone="muted" className="text-pretty">
          <span className="font-medium text-text">Problem · </span>
          {project.problem}
        </Text>

        <TechStack items={project.stack} max={4} />
      </CardContent>

      <CardFooter className="relative z-10 flex-wrap gap-2 border-t border-line pb-(--card-padding) pt-(--card-padding)">
        <Button asChild size="sm" variant="secondary">
          <Link href={href}>Case study</Link>
        </Button>
        {hasGitHub ? (
          <Button asChild size="sm" variant="ghost">
            <a
              href={project.links.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-(--icon-sm)" />
              GitHub
              <ArrowUpRight />
            </a>
          </Button>
        ) : null}
        {hasLive ? (
          <Button asChild size="sm" variant="ghost">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ExternalLink />
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
