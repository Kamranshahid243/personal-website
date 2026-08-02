import { Layers, Rocket, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { BlogCard } from "@/components/cards/blog-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ProjectCard } from "@/components/cards/project-card";
import { ServiceCard } from "@/components/cards/service-card";
import { AnimatedBackground } from "@/components/common/animated-background";
import { AvailabilityBadge } from "@/components/common/availability-badge";
import { CodeWindow } from "@/components/common/code-window";
import { SectionHeading } from "@/components/common/section-heading";
import { SkillBadge } from "@/components/common/skill-badge";
import { SocialLinks } from "@/components/common/social-links";
import { TechStack, TechStackBadge } from "@/components/common/tech-stack";
import { Timeline } from "@/components/common/timeline";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import {
  Display,
  Eyebrow,
  Heading,
  Subheading,
  Text,
} from "@/components/ui/typography";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo/metadata";
import type { PostSummary } from "@/types/blog";

/**
 * Component gallery.
 *
 * Every reusable component on one page so regressions are obvious and the
 * composition rules stay honest. Internal only — noindex, not in the sitemap.
 */
export const metadata = createMetadata({
  title: "Components",
  pathname: "/components",
  noIndex: true,
});

const samplePost: PostSummary = {
  slug: "example-post",
  title: "Example post",
  description:
    "A reference article showing every frontmatter field the pipeline supports.",
  publishedAt: "2026-01-01",
  category: "Meta",
  tags: ["meta", "architecture"],
  draft: true,
  featured: false,
  readingTime: 4,
};

function Spec({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Section
      spacing="sm"
      surface="bordered"
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <Container width="wide" className="grid gap-(--spacing-stack-lg)">
        <div className="grid gap-(--spacing-stack-xs)">
          <Heading size="lg">{title}</Heading>
          <Text tone="muted" measure>
            {description}
          </Text>
        </div>
        {children}
      </Container>
    </Section>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Section className="relative overflow-hidden">
          <AnimatedBackground variant="dots" />
          <Container
            width="wide"
            className="relative flex flex-col gap-(--spacing-stack-md)"
          >
            <Eyebrow>Library</Eyebrow>
            <Display size="md">Reusable components</Display>
            <Subheading>
              Everything the marketing pages will compose. Each block below is
              the real component with real sample data — not a mock.
            </Subheading>
          </Container>
        </Section>

        <Spec
          title="Navbar and footer"
          description="Sticky header with desktop links, availability badge, theme toggle and mobile sheet. Footer mirrors navigation from the same config."
        >
          <Text size="sm" tone="subtle">
            Rendered at the top and bottom of this page.
          </Text>
        </Spec>

        <Spec
          title="Section heading"
          description="Eyebrow, heading and subheading with one shared rhythm. Align start for content sections, center for CTAs."
        >
          <div className="grid gap-(--spacing-block) md:grid-cols-2">
            <SectionHeading
              eyebrow="Work"
              heading="Selected projects"
              subheading="A short curated list — strongest first."
            />
            <SectionHeading
              eyebrow="Contact"
              heading="Let's talk"
              subheading="Usually reply within one business day."
              align="center"
              size="display"
            />
          </div>
        </Spec>

        <Spec
          title="Buttons, badges and tags"
          description="Semantic variants. Badge is state; Tag is taxonomy. SkillBadge and TechStackBadge specialise further."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <AvailabilityBadge />
            <Badge variant="brand">New</Badge>
            <Tag>TypeScript</Tag>
            <Tag interactive selected>
              Filter
            </Tag>
          </div>
          <div className="flex flex-wrap gap-2">
            <SkillBadge icon={Sparkles}>System design</SkillBadge>
            <SkillBadge icon={Layers}>Design systems</SkillBadge>
            <SkillBadge icon={Rocket}>Product delivery</SkillBadge>
            <TechStackBadge>Next.js</TechStackBadge>
            <TechStack items={["React", "TypeScript", "PostgreSQL"]} />
          </div>
        </Spec>

        <Spec
          title="Cards"
          description="Project, service, blog and experience cards. Whole-card hit targets via a stretched link on the title — one tab stop, one accessible name."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <BlogCard post={samplePost} />
          </div>
        </Spec>

        <Spec
          title="Timeline"
          description="CSS-only vertical rail. Content is slotted via Timeline.Item — usually an ExperienceCard."
        >
          <Timeline>
            {experience.map((item) => (
              <Timeline.Item key={`${item.company}-${item.start}`}>
                <ExperienceCard experience={item} />
              </Timeline.Item>
            ))}
          </Timeline>
        </Spec>

        <Spec
          title="Social links"
          description="Drawn from siteConfig. Empty hrefs are filtered out, so clearing a handle hides it everywhere."
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <SocialLinks />
            <SocialLinks variant="labelled" className="max-w-xs" />
          </div>
        </Spec>

        <Spec
          title="Code window"
          description="Editor chrome around a snippet. Purely decorative — no JavaScript. Pair with Shiki output or a hand-authored pre."
        >
          <CodeWindow title="src/lib/format.ts" language="ts">
            <pre className="px-4">
              <code>{`export function formatReadingTime(minutes: number) {
  return \`\${minutes} min read\`;
}`}</code>
            </pre>
          </CodeWindow>
        </Spec>

        <Spec
          title="Animated background"
          description="CSS-only atmosphere. Three variants: dots, grid, glow. Respects prefers-reduced-motion via the global base rule."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {(["dots", "grid", "glow"] as const).map((variant) => (
              <div
                key={variant}
                className="relative h-40 overflow-hidden rounded-(--radius-xl) border border-line"
              >
                <AnimatedBackground variant={variant} />
                <div className="relative grid h-full place-items-center">
                  <Text size="sm" weight="medium" className="font-mono">
                    {variant}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Spec>

        <CtaSection secondaryLabel="View work" secondaryHref="/work" />
      </main>
      <Footer />
    </>
  );
}
