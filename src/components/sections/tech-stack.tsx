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
        <SectionHeading
          id="stack-heading"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          subheading={copy.subheading}
          className="reveal-on-scroll"
        />

        <div className="mt-(--spacing-stack-lg) grid gap-8 sm:grid-cols-2">
          {techStack.map((category, index) => (
            <div
              key={category.title}
              className="reveal-on-scroll"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Heading as="h3" size="sm">
                {category.title}
              </Heading>
              <TechStack items={category.items} className="mt-4" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
