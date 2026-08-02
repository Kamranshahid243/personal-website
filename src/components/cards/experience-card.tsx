import { ArrowUpRight } from "lucide-react";

import { TechStack } from "@/components/common/tech-stack";
import { Heading, Text } from "@/components/ui/typography";
import { formatDateRange } from "@/lib/format";
import type { Experience } from "@/types/content";
import { cn } from "@/lib/utils";

type ExperienceCardProps = {
  experience: Experience;
  className?: string;
};

/**
 * One role in a career history.
 *
 * Achievements over responsibilities: the highlights list is what a recruiter
 * actually reads. Designed to sit inside a `<Timeline>` or stand alone on the
 * about page — the left rail is the timeline's job, not this card's.
 */
export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  const { company, role, start, end, location, highlights, stack, url } =
    experience;

  return (
    <article
      data-slot="experience-card"
      className={cn("grid gap-(--spacing-stack-sm)", className)}
    >
      <header className="grid gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <Heading as="h3" size="sm">
            {role}
            <span className="font-normal text-text-muted">
              {" "}
              at{" "}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm text-text underline decoration-line-strong underline-offset-3 focus-ring transition-ui hover:decoration-current"
                >
                  {company}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              ) : (
                company
              )}
            </span>
          </Heading>
          <Text
            as="p"
            size="caption"
            tone="subtle"
            className="font-mono whitespace-nowrap"
          >
            {formatDateRange(start, end)}
          </Text>
        </div>
        <Text size="sm" tone="muted">
          {location}
        </Text>
      </header>

      {highlights.length > 0 ? (
        <ul className="grid gap-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2 text-body-sm text-text-muted">
              <span
                aria-hidden
                className="mt-2 size-1 shrink-0 rounded-full bg-text-subtle"
              />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <TechStack items={stack} max={6} />
    </article>
  );
}
