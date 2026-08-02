import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { GitHubIcon } from "@/components/common/social-icons";
import { TechStack } from "@/components/common/tech-stack";
import { ProjectCard } from "@/components/cards/project-card";
import { ProjectCover } from "@/components/project/project-cover";
import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/components/ui/tag";
import { Heading, Lead, Text } from "@/components/ui/typography";
import type { Project, ProjectScreenshot } from "@/types/content";
import { isUsableHref } from "@/lib/links";
import { cn } from "@/lib/utils";

type ProjectCaseStudyProps = {
  project: Project;
  related: readonly Project[];
};

type TocItem = {
  id: string;
  label: string;
};

function buildToc(hasScreenshots: boolean): TocItem[] {
  const items: TocItem[] = [
    { id: "overview", label: "Project overview" },
    { id: "business-problem", label: "Business problem" },
    { id: "goals", label: "Goals" },
    { id: "research", label: "Research" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    { id: "tech-stack", label: "Tech stack" },
  ];

  if (hasScreenshots) {
    items.push({ id: "screenshots", label: "Screenshots" });
  }

  items.push(
    { id: "challenges", label: "Challenges" },
    { id: "lessons", label: "Lessons learned" },
    { id: "results", label: "Results" },
  );

  return items;
}

function CaseStudyBlock({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-28 reveal-on-scroll", className)}
    >
      <Heading as="h2" size="sm" id={`${id}-heading`}>
        {title}
      </Heading>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid list-none gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-text-muted">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
          />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <Text as="p" size="lg" tone="muted" className="text-pretty">
      {children}
    </Text>
  );
}

function CaseStudyToc({ items }: { items: readonly TocItem[] }) {
  return (
    <nav
      aria-label="Case study sections"
      className="reveal-on-scroll rounded-(--radius-lg) border border-line bg-surface-sunken/50 p-5 lg:sticky lg:top-24 lg:border-0 lg:bg-transparent lg:p-0"
    >
      <Text
        as="p"
        size="sm"
        weight="medium"
        className="font-mono tracking-[0.12em] text-text-subtle uppercase"
      >
        In this case study
      </Text>
      <ol className="mt-4 grid list-none gap-2 p-0">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-baseline gap-3 rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring"
            >
              <span
                aria-hidden
                className="font-mono text-caption text-text-subtle tabular-nums transition-ui group-hover:text-brand-600"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ScreenshotFigure({
  shot,
  index,
}: {
  shot: ProjectScreenshot;
  index: number;
}) {
  const caption = shot.caption ?? shot.alt;

  return (
    <figure className="overflow-hidden rounded-(--radius-lg) border border-line bg-surface">
      <div className="relative aspect-[16/10] bg-surface-sunken">
        {shot.src ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex flex-col justify-between p-5"
            style={{
              backgroundImage: `
                radial-gradient(80% 70% at ${index % 2 === 0 ? "18%" : "82%"} 20%, color-mix(in oklch, var(--color-brand-400) 28%, transparent), transparent 55%),
                linear-gradient(160deg, var(--color-surface), var(--color-surface-sunken))
              `,
            }}
          >
            <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-40" />
            <span className="relative font-mono text-caption tracking-[0.14em] text-text-subtle uppercase">
              Figure {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative max-w-[18ch] font-heading text-heading-sm text-text/35">
              {shot.alt}
            </span>
          </div>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3">
        <Text as="span" size="sm" tone="muted">
          {caption}
        </Text>
      </figcaption>
    </figure>
  );
}

function ResultsBlock({ project }: { project: Project }) {
  return (
    <div className="grid gap-6">
      <Prose>{project.results}</Prose>
      {project.metrics.length > 0 ? (
        <dl className="grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={`result-${metric.label}-${metric.value}`}
              className="border-l-2 border-brand-400/70 pl-4"
            >
              <dt className="font-mono text-caption tracking-[0.12em] text-text-subtle uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 font-heading text-heading-md font-semibold tabular-nums">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

/**
 * Reusable case-study template for `/projects/[slug]`.
 *
 * Every project tells the same complete story — problem through results —
 * so the detail route reads as a professional engagement write-up, not a
 * portfolio tile with a longer description.
 */
export function ProjectCaseStudy({ project, related }: ProjectCaseStudyProps) {
  const screenshots = project.screenshots ?? [];
  const hasScreenshots = screenshots.length > 0;
  const toc = buildToc(hasScreenshots);

  return (
    <article aria-labelledby="case-study-title">
      {/* Hero */}
      <Section
        spacing="lg"
        className="border-b border-line"
        aria-labelledby="case-study-title"
      >
        <Container width="content">
          <div className="reveal-on-load">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-caption text-text-subtle">
                <li>
                  <Link
                    href={"/" as Route}
                    className="rounded-sm transition-ui hover:text-text focus-ring"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={"/projects" as Route}
                    className="rounded-sm transition-ui hover:text-text focus-ring"
                  >
                    Projects
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-text-muted" aria-current="page">
                  {project.title}
                </li>
              </ol>
            </nav>

            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6">
              <Link href={"/projects" as Route}>
                <ArrowLeft />
                All projects
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-caption text-text-subtle">
              <Tag variant="brand">{project.category}</Tag>
              <span>{project.client}</span>
              <span aria-hidden>·</span>
              <time dateTime={String(project.year)}>{project.year}</time>
              <span aria-hidden>·</span>
              <span>{project.role}</span>
            </div>

            <Heading
              as="h1"
              size="lg"
              id="case-study-title"
              className="mt-3 max-w-3xl"
            >
              {project.title}
            </Heading>
            <Lead className="mt-4 max-w-2xl">{project.overview}</Lead>

            {project.metrics.length > 0 ? (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className="rounded-(--radius-lg) border border-line bg-surface-sunken px-5 py-4"
                  >
                    <dt className="font-mono text-caption tracking-[0.12em] text-text-subtle uppercase">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-heading text-heading-md font-semibold tabular-nums">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {(isUsableHref(project.links.live) ||
              isUsableHref(project.links.repository)) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {isUsableHref(project.links.live) ? (
                  <Button asChild>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View live
                      <ExternalLink />
                    </a>
                  </Button>
                ) : null}
                {isUsableHref(project.links.repository) ? (
                  <Button asChild variant="secondary">
                    <a
                      href={project.links.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon className="size-(--icon-sm)" />
                      Repository
                      <ArrowUpRight />
                    </a>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-line">
        <Container width="wide" className="py-section-sm">
          <ProjectCover
            project={project}
            priority
            aspectClassName="aspect-[16/9]"
            className="rounded-(--radius-lg) border border-line"
          />
        </Container>
      </Section>

      {/* Story body: overview → tech stack */}
      <Section spacing="lg">
        <Container width="wide">
          <div className="grid gap-(--spacing-stack-lg) lg:grid-cols-[14rem_minmax(0,42rem)] lg:justify-between xl:grid-cols-[16rem_minmax(0,42rem)]">
            <aside className="lg:pt-1">
              <CaseStudyToc items={toc} />
            </aside>

            <div className="grid min-w-0 gap-(--spacing-stack-lg)">
              <CaseStudyBlock id="overview" title="Project overview">
                <Prose>{project.summary}</Prose>
                <Text
                  as="p"
                  size="md"
                  tone="muted"
                  className="mt-4 text-pretty"
                >
                  <span className="font-medium text-text">My role. </span>
                  {project.roleSummary}
                </Text>
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="business-problem" title="Business problem">
                <Prose>{project.businessProblem}</Prose>
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="goals" title="Goals">
                <BulletList items={project.goals} />
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="research" title="Research">
                <Prose>{project.research}</Prose>
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="solution" title="Solution">
                <Prose>{project.solution}</Prose>
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="architecture" title="Architecture">
                <Prose>{project.architecture}</Prose>
              </CaseStudyBlock>

              <Separator />

              <CaseStudyBlock id="tech-stack" title="Tech stack">
                <TechStack items={project.stack} />
              </CaseStudyBlock>
            </div>
          </div>
        </Container>
      </Section>

      {/* Screenshots */}
      {hasScreenshots ? (
        <Section
          id="screenshots"
          spacing="lg"
          surface="sunken"
          aria-labelledby="screenshots-heading"
          className="scroll-mt-28"
        >
          <Container width="wide">
            <SectionHeading
              id="screenshots-heading"
              eyebrow="Screenshots"
              heading="Product surfaces"
              subheading="Key interfaces and proof points from the engagement."
              className="reveal-on-scroll"
            />
            <ul className="mt-(--spacing-stack-lg) grid list-none gap-6 p-0 md:grid-cols-2">
              {screenshots.map((shot, index) => (
                <li key={`${shot.alt}-${index}`} className="reveal-on-scroll">
                  <ScreenshotFigure shot={shot} index={index} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Challenges → results */}
      <Section spacing="lg">
        <Container width="content">
          <div className="grid gap-(--spacing-stack-lg)">
            <CaseStudyBlock id="challenges" title="Challenges">
              <BulletList items={project.challenges} />
            </CaseStudyBlock>

            <Separator />

            <CaseStudyBlock id="lessons" title="Lessons learned">
              <BulletList items={project.lessonsLearned} />
            </CaseStudyBlock>

            <Separator />

            <CaseStudyBlock id="results" title="Results">
              <ResultsBlock project={project} />
            </CaseStudyBlock>
          </div>
        </Container>
      </Section>

      {/* Related projects */}
      {related.length > 0 ? (
        <Section
          id="related"
          spacing="lg"
          aria-labelledby="related-heading"
          surface="sunken"
        >
          <Container width="wide">
            <SectionHeading
              id="related-heading"
              eyebrow="Related projects"
              heading="More case studies"
              subheading="Adjacent engagements with a similar problem shape or stack."
              className="reveal-on-scroll"
            />
            <ul className="mt-(--spacing-stack-lg) grid list-none gap-6 p-0 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug} className="h-full reveal-on-scroll">
                  <ProjectCard project={item} className="h-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Call to action */}
      <CtaSection
        id="hire"
        eyebrow="Next step"
        heading="Want results like these on your team?"
        subheading="Whether you are hiring full-time or scoping a freelance engagement, tell me about the role or the problem — I usually reply within one business day."
        secondaryLabel="All projects"
        secondaryHref="/projects"
      />
    </article>
  );
}
