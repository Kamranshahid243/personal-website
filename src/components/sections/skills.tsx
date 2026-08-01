import { SectionHeading } from "@/components/common/section-heading";
import { SkillBadge } from "@/components/common/skill-badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy, skills } from "@/data/home";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SkillsSectionProps = {
  className?: string;
};

export function SkillsSection({ className }: SkillsSectionProps) {
  const { skills: copy } = homeCopy;

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
      spacing="lg"
      className={className}
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          subheading={copy.subheading}
          className="reveal-on-scroll"
        />

        <ul
          className={cn(
            "mt-(--spacing-stack-lg) flex reveal-on-scroll list-none flex-wrap gap-3 p-0",
          )}
        >
          {skills.map((skill) => (
            <li key={skill.name}>
              <SkillBadge icon={getIcon(skill.icon)}>{skill.name}</SkillBadge>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
