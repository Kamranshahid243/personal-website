import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Text } from "@/components/ui/typography";
import { aboutStats, homeCopy } from "@/data/home";
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
            "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-20",
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
                <Text as="p" size="lg" tone="muted" className="text-pretty">
                  {paragraph}
                </Text>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160}>
          <dl
            className={cn(
              "mt-(--spacing-block) grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-2xl) border border-line",
              "sm:grid-cols-4",
            )}
          >
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-surface-raised px-6 py-6 sm:px-8 sm:py-7"
              >
                <dt className="order-2 text-body-sm text-text-muted">
                  {stat.label}
                </dt>
                <dd className="order-1 font-heading text-display-sm font-bold tabular-nums text-brand-600 dark:text-brand-400">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
