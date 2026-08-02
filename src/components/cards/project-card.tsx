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
 * Compact case-study tile — metric + title lead; detail lives on the case study.
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
      className={cn(
        "h-full gap-0 overflow-hidden pt-0",
        "[--card-padding:1rem] sm:[--card-padding:1.125rem]",
        className,
      )}
    >
      {showCover ? (
        <ProjectCover
          project={project}
          aspectClassName="aspect-[16/9] max-h-[11rem] w-full sm:max-h-[12.5rem]"
          className="border-b border-line"
        />
      ) : null}

      <CardHeader className="pt-(--card-padding)">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Tag variant="brand">{project.category}</Tag>
          <span className="font-mono text-caption text-text-muted">
            <span>{project.client}</span>
            <span aria-hidden className="mx-1.5">
              ·
            </span>
            <time dateTime={String(project.year)}>{project.year}</time>
          </span>
        </div>
        <CardTitle as="h2" className="mt-1.5 text-heading-sm">
          <Link href={href} className="link-overlay rounded-sm focus-ring">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pb-(--card-padding)">
        {metric ? (
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-heading text-heading-sm font-semibold tabular-nums text-brand-700 dark:text-brand-300">
              {metric.value}
            </span>
            <Text as="span" size="caption" tone="muted">
              {metric.label}
            </Text>
          </p>
        ) : null}

        <TechStack items={project.stack} max={3} />
      </CardContent>

      <CardFooter className="relative z-10 flex-wrap gap-1.5 border-t border-line pt-3">
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
