import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Icon } from "@/components/ui/icon";
import { Heading, Text } from "@/components/ui/typography";
import { differentiators, homeCopy } from "@/data/home";
import { getIcon } from "@/lib/icons";

export type WhyWorkWithMeSectionProps = {
  className?: string;
};

export function WhyWorkWithMeSection({ className }: WhyWorkWithMeSectionProps) {
  const { why: copy } = homeCopy;

  return (
    <Section
      id="why"
      aria-labelledby="why-heading"
      spacing="lg"
      surface="tint"
      className={className}
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
        </Reveal>

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-8 p-0 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            return (
              <Reveal key={item.title} as="li" delay={index * 100}>
                <article className="group transition-ui-base hover:-translate-y-1">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-(--radius-lg) bg-brand-100 text-brand-700 transition-ui group-hover:scale-105 dark:bg-brand-900 dark:text-brand-300">
                    <Icon icon={IconComponent} size="md" />
                  </div>
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <Text as="p" size="sm" tone="muted" className="mt-2">
                    {item.description}
                  </Text>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
