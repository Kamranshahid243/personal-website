import { SectionHeading } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { Service } from "@/types/content";
import { cn } from "@/lib/utils";

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
      surface="sunken"
      className={className}
    >
      <Container width="wide">
        <SectionHeading
          id="services-heading"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          subheading={copy.subheading}
          className="reveal-on-scroll"
        />

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className={cn("h-full reveal-on-scroll")}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ServiceCard service={service} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
