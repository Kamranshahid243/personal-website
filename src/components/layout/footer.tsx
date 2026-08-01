import Link from "next/link";
import type { Route } from "next";

import { SocialLinks } from "@/components/common/social-links";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/ui/typography";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Site footer.
 *
 * Mirrors the primary nav from the same config so a new page never has to be
 * added in two places. Purely a server component — no state, no effects, no
 * reason to ship JavaScript for a list of links.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-sunken">
      <Container width="wide" className="py-section-sm">
        <div className="grid gap-(--spacing-block) md:grid-cols-[1.4fr_2fr]">
          <div className="grid gap-(--spacing-stack-sm)">
            <Link
              href="/"
              className="w-fit rounded-sm font-heading text-body-md font-semibold focus-ring"
            >
              {siteConfig.name}
            </Link>
            <Text size="sm" tone="muted" measure>
              {siteConfig.tagline}
            </Text>
            <SocialLinks />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((section) => (
              <div key={section.title} className="grid gap-3">
                <Text
                  as="p"
                  size="caption"
                  weight="medium"
                  className="text-text"
                >
                  {section.title}
                </Text>
                <ul className="grid gap-2">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          {...(item.href.startsWith("http")
                            ? {
                                target: "_blank" as const,
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="rounded-sm text-body-sm text-text-muted focus-ring transition-ui hover:text-text"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className="rounded-sm text-body-sm text-text-muted focus-ring transition-ui hover:text-text"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-(--spacing-block) flex flex-col gap-2 border-t border-line pt-(--spacing-stack-md) sm:flex-row sm:items-center sm:justify-between">
          <Text size="caption" tone="subtle">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <Text size="caption" tone="subtle" className="font-mono">
            {siteConfig.role}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
