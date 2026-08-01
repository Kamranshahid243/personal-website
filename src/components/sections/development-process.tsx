import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";
import { homeCopy, processSteps } from "@/data/home";

export type DevelopmentProcessSectionProps = {
  className?: string;
};

export function DevelopmentProcessSection({
  className,
}: DevelopmentProcessSectionProps) {
  const { process: copy } = homeCopy;

  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
      spacing="lg"
      surface="sunken"
      className={className}
    >
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          subheading={copy.subheading}
          className="reveal-on-scroll"
        />

        <ol className="mt-(--spacing-stack-lg) grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="reveal-on-scroll"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <article className="h-full">
                <Text
                  as="p"
                  size="caption"
                  tone="subtle"
                  className="font-mono tracking-[0.16em] uppercase"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Heading as="h3" size="sm" className="mt-3">
                  {step.title}
                </Heading>
                <Text as="p" size="sm" tone="muted" className="mt-2">
                  {step.description}
                </Text>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
