import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { Service } from "@/types/content";

export type ServicesSectionProps = {
  services: readonly Service[];
  className?: string;
};

export function ServicesSection({ services, className }: ServicesSectionProps) {
  const { services: copy } = homeCopy;

  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      spacing="lg"
      surface="tint"
      className={className}
    >
      <Container width="wide">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
        </Reveal>

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              as="li"
              delay={index * 90}
              className="h-full"
            >
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
