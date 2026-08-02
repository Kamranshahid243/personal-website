import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { projects } from "@/data/projects";
import { collectionPageSchema, buildGraph } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Selected case studies by Kamran Shahid — corporate web rebuilds, AI content systems, and business workflow automation.",
  pathname: "/projects",
  keywords: [
    "Kamran Shahid portfolio",
    "Next.js case studies",
    "AI automation projects",
    "full stack projects",
  ],
});

/**
 * Curated project index — quality over quantity.
 *
 * A short list reads as taste. Filters return once the set grows large enough
 * to need them; until then the grid is the product.
 */
export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        graph={buildGraph(
          collectionPageSchema({
            name: "Projects — Kamran Shahid",
            description:
              "Selected software engineering and automation case studies by Kamran Shahid.",
            path: "/projects",
            items: projects.map((project) => ({
              name: project.title,
              path: `/projects/${project.slug}`,
            })),
          }),
        )}
      />

      <Section spacing="lg" className="border-b border-line">
        <Container width="wide">
          <SectionHeading
            id="projects-heading"
            eyebrow="Projects"
            heading="Selected work, documented as case studies"
            subheading="Corporate websites, AI content systems, and business automations — each with the problem, approach, and outcome."
            className="reveal-on-load max-w-3xl"
            as="h1"
            size="display"
          />
        </Container>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="projects-heading"
        className="pt-section"
      >
        <Container width="wide">
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
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

      <CtaSection
        heading="Let’s create something meaningful"
        subheading="Share the product, workflow, or role you’re hiring for. I usually reply within one business day."
        secondaryLabel="Read the blog"
        secondaryHref="/blog"
      />
    </>
  );
}
