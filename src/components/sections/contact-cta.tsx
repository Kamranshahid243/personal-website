import { CtaSection } from "@/components/sections/cta";
import { homeCopy } from "@/data/home";

export type ContactCtaSectionProps = {
  className?: string;
};

/**
 * Homepage contact CTA — thin wrapper so every homepage block
 * remains a named, reusable section component.
 */
export function ContactCtaSection({ className }: ContactCtaSectionProps) {
  const { contact } = homeCopy;

  return (
    <CtaSection
      id="contact"
      eyebrow={contact.eyebrow}
      heading={contact.heading}
      subheading={contact.subheading}
      secondaryLabel={contact.secondaryLabel}
      secondaryHref={contact.secondaryHref}
      className={className}
    />
  );
}
