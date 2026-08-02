import Link from "next/link";
import type { Route } from "next";

import { SocialLinks } from "@/components/common/social-links";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { footerNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Site footer — navigation plus a clear conversion ask.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const siteLinks = footerNav.find((section) => section.title === "Site");
  const elsewhere = footerNav.find((section) => section.title === "Elsewhere");

  return (
    <footer className="border-t border-line bg-surface-sunken">
      <Container width="wide" className="py-section-sm">
        <div className="grid gap-(--spacing-block) md:grid-cols-[1.5fr_1fr_1fr]">
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
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild size="sm">
                <a href={primaryCta.href}>{primaryCta.title}</a>
              </Button>
              <SocialLinks />
            </div>
          </div>

          {siteLinks ? (
            <div className="grid gap-3">
              <Text as="p" size="caption" weight="medium" className="text-text">
                {siteLinks.title}
              </Text>
              <ul className="grid gap-2">
                {siteLinks.items
                  .filter((item) => item.href !== primaryCta.href)
                  .map((item) => (
                    <li key={`${item.title}-${item.href}`}>
                      {item.external ? (
                        <a
                          href={item.href}
                          className="rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className="rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}

          {elsewhere && elsewhere.items.length > 0 ? (
            <div className="grid gap-3">
              <Text as="p" size="caption" weight="medium" className="text-text">
                {elsewhere.title}
              </Text>
              <ul className="grid gap-2">
                {elsewhere.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid gap-3">
              <Text as="p" size="caption" weight="medium" className="text-text">
                Contact
              </Text>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring"
              >
                {siteConfig.email}
              </a>
            </div>
          )}
        </div>

        <div className="mt-(--spacing-block) flex flex-col gap-2 border-t border-line pt-(--spacing-stack-md) sm:flex-row sm:items-center sm:justify-between">
          <Text size="caption" tone="muted">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <Text size="caption" tone="muted" className="font-mono">
            {siteConfig.role}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
