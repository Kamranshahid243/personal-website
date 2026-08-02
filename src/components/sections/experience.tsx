import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Timeline } from "@/components/common/timeline";
import { ExperienceCard } from "@/components/cards/experience-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { Experience } from "@/types/content";

export type ExperienceSectionProps = {
  experience: readonly Experience[];
  className?: string;
};

export function ExperienceSection({
  experience,
  className,
}: ExperienceSectionProps) {
  const { experience: copy } = homeCopy;

  return (
    <Section
      id="experience"
      aria-labelledby="experience-heading"
      spacing="lg"
      surface="sunken"
      className={className}
    >
      <Container width="content">
        <Reveal>
          <SectionHeading
            id="experience-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
        </Reveal>

        <Timeline className="mt-(--spacing-stack-lg)">
          {experience.map((item, index) => (
            <Timeline.Item
              key={`${item.company}-${item.role}-${item.start}`}
              label={item.start.slice(0, 4)}
            >
              <Reveal delay={index * 100}>
                <ExperienceCard experience={item} />
              </Reveal>
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}
