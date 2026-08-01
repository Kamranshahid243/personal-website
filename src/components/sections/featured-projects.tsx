import Link from "next/link";
import type { Route } from "next";

import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

export type FeaturedProjectsSectionProps = {
  projects: readonly Project[];
  className?: string;
};

export function FeaturedProjectsSection({
  projects,
  className,
}: FeaturedProjectsSectionProps) {
  const { featuredProjects: copy } = homeCopy;

  return (
    <Section
      id="work"
      aria-labelledby="work-heading"
      spacing="lg"
      className={className}
    >
      <Container width="wide">
        <div className="flex reveal-on-scroll flex-col gap-(--spacing-stack-md) sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="work-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
          <Button
            asChild
            variant="secondary"
            className="shrink-0 self-start sm:self-auto"
          >
            <Link href={"/projects" as Route}>View all projects</Link>
          </Button>
        </div>

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-6 p-0 md:grid-cols-2">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={cn("h-full reveal-on-scroll")}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ProjectCard project={project} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
