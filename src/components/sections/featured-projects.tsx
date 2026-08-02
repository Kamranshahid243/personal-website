import Link from "next/link";
import type { Route } from "next";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { Project } from "@/types/content";

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
        <Reveal className="flex flex-col gap-(--spacing-stack-md) sm:flex-row sm:items-end sm:justify-between">
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
        </Reveal>

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              as="li"
              delay={index * 100}
              className="h-full"
            >
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
