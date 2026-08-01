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
      surface="sunken"
      className={className}
    >
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          subheading={copy.subheading}
          className="reveal-on-scroll"
        />

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            return (
              <li
                key={item.title}
                className="reveal-on-scroll"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <article>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-(--radius-lg) bg-surface text-text">
                    <Icon icon={IconComponent} size="md" tone="muted" />
                  </div>
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <Text as="p" size="sm" tone="muted" className="mt-2">
                    {item.description}
                  </Text>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
