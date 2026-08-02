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
    <footer className="border-t border-brand-800 bg-brand-950 text-text-inverse dark:bg-brand-900">
      <Container width="wide" className="py-section-sm">
        <div className="grid gap-(--spacing-block) md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="grid gap-(--spacing-stack-sm)">
            <Link
              href="/"
              className="w-fit rounded-sm font-heading text-body-md font-semibold text-text-inverse focus-ring"
            >
              {siteConfig.name}
            </Link>
            <Text size="sm" className="max-w-md text-pretty text-text-inverse/75">
              {siteConfig.tagline}
            </Text>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild size="sm" variant="secondary" className="border-transparent bg-text-inverse text-brand-900 hover:bg-brand-100">
                <a href={primaryCta.href}>{primaryCta.title}</a>
              </Button>
              <SocialLinks className="[&_a]:text-text-inverse/80 [&_a:hover]:text-text-inverse" />
            </div>
          </div>

          {siteLinks ? (
            <div className="grid gap-3">
              <Text
                as="p"
                size="caption"
                weight="medium"
                className="text-text-inverse/60"
              >
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
                          className="rounded-sm text-body-sm text-text-inverse/80 transition-ui hover:text-text-inverse focus-ring"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className="rounded-sm text-body-sm text-text-inverse/80 transition-ui hover:text-text-inverse focus-ring"
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
              <Text
                as="p"
                size="caption"
                weight="medium"
                className="text-text-inverse/60"
              >
                {elsewhere.title}
              </Text>
              <ul className="grid gap-2">
                {elsewhere.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-body-sm text-text-inverse/80 transition-ui hover:text-text-inverse focus-ring"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid gap-3">
              <Text
                as="p"
                size="caption"
                weight="medium"
                className="text-text-inverse/60"
              >
                Contact
              </Text>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm text-body-sm text-text-inverse/80 transition-ui hover:text-text-inverse focus-ring"
              >
                {siteConfig.email}
              </a>
            </div>
          )}
        </div>

        <div className="mt-(--spacing-block) flex flex-col gap-2 border-t border-text-inverse/15 pt-(--spacing-stack-md) sm:flex-row sm:items-center sm:justify-between">
          <Text size="caption" className="text-text-inverse/55">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <Text size="caption" className="font-mono text-text-inverse/55">
            {siteConfig.role}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
