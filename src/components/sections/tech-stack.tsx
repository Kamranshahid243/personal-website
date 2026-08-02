import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { TechStack } from "@/components/common/tech-stack";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { homeCopy, techStack } from "@/data/home";

export type TechStackSectionProps = {
  className?: string;
};

export function TechStackSection({ className }: TechStackSectionProps) {
  const { techStack: copy } = homeCopy;

  return (
    <Section
      id="stack"
      aria-labelledby="stack-heading"
      spacing="lg"
      className={className}
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="stack-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
        </Reveal>

        <div className="mt-(--spacing-stack-lg) grid gap-8 sm:grid-cols-2">
          {techStack.map((category, index) => (
            <Reveal key={category.title} delay={index * 80}>
              <Heading as="h3" size="sm">
                {category.title}
              </Heading>
              <TechStack items={category.items} className="mt-4" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
