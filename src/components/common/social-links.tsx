import { Mail } from "lucide-react";
import type { ComponentProps, ComponentType } from "react";

import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/common/social-icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

function getLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { label: "GitHub", href: siteConfig.links.github, icon: GitHubIcon },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
    { label: "X", href: siteConfig.links.x, icon: XIcon },
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
    },
  ];

  return links.filter((link) => Boolean(link.href));
}

type SocialLinksProps = {
  /** Icon-only (header/footer) or labelled (about/contact). */
  variant?: "icon" | "labelled";
  className?: string;
} & Omit<ComponentProps<"ul">, "children">;

/**
 * Social and contact links, drawn from `siteConfig`.
 *
 * One component so the header, the footer and the contact page never disagree
 * about which profiles exist. Empty hrefs are filtered out, so clearing a
 * handle in config is enough to hide it everywhere.
 */
export function SocialLinks({
  variant = "icon",
  className,
  ...props
}: SocialLinksProps) {
  const links = getLinks();

  return (
    <ul
      data-slot="social-links"
      className={cn(
        "flex items-center",
        variant === "icon" ? "gap-1" : "flex-col items-stretch gap-2",
        className,
      )}
      {...props}
    >
      {links.map((link) => {
        const Icon = link.icon;
        const isMail = link.href.startsWith("mailto:");

        return (
          <li key={link.label}>
            {variant === "icon" ? (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                >
                  <Icon className="size-(--icon-sm)" />
                </a>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="md"
                asChild
                className="w-full justify-start"
              >
                <a
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                >
                  <Icon className="size-(--icon-sm)" />
                  {link.label}
                </a>
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
