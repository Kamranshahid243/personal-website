import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Text } from "@/components/ui/typography";
import { homeCopy } from "@/data/home";
import { cn } from "@/lib/utils";

export type AboutSectionProps = {
  className?: string;
};

export function AboutSection({ className }: AboutSectionProps) {
  const { about } = homeCopy;

  return (
    <Section
      id="about"
      aria-labelledby="about-heading"
      spacing="lg"
      className={className}
    >
      <Container>
        <div
          className={cn(
            "grid gap-(--spacing-stack-lg)",
            "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16",
          )}
        >
          <Reveal>
            <SectionHeading
              id="about-heading"
              eyebrow={about.eyebrow}
              heading={about.heading}
            />
          </Reveal>
          <div className="grid gap-(--spacing-stack-sm)">
            {about.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={80 + index * 80}>
                <Text as="p" size="lg" tone="muted">
                  {paragraph}
                </Text>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
