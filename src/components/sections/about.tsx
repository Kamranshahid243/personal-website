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
            "grid reveal-on-scroll gap-(--spacing-stack-lg)",
            "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16",
          )}
        >
          <SectionHeading
            id="about-heading"
            eyebrow={about.eyebrow}
            heading={about.heading}
          />
          <div className="grid gap-(--spacing-stack-sm)">
            {about.body.map((paragraph) => (
              <Text key={paragraph} as="p" size="lg" tone="muted">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
