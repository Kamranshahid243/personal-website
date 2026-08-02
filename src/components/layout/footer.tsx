import Link from "next/link";
import type { Route } from "next";

import { SocialLinks } from "@/components/common/social-links";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { footerNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Site footer — always a dark brand surface, so text colours are fixed light
 * (not `text-inverse`, which flips dark in dark mode and becomes unreadable).
 */
export function Footer() {
  const year = new Date().getFullYear();
  const siteLinks = footerNav.find((section) => section.title === "Site");
  const elsewhere = footerNav.find((section) => section.title === "Elsewhere");

  return (
    <footer className="border-t border-brand-800 bg-brand-950 text-brand-50">
      <Container width="wide" className="py-section-sm">
        <div className="grid gap-(--spacing-block) md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="grid gap-(--spacing-stack-sm)">
            <Link
              href="/"
              className="w-fit rounded-sm font-heading text-body-md font-semibold text-brand-50 focus-ring"
            >
              {siteConfig.name}
            </Link>
            <Text size="sm" className="max-w-md text-pretty text-brand-100/80">
              {siteConfig.tagline}
            </Text>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="border-transparent bg-brand-50 text-brand-950 hover:bg-brand-100"
              >
                <a href={primaryCta.href}>{primaryCta.title}</a>
              </Button>
              <SocialLinks className="[&_a]:text-brand-100/80 [&_a:hover]:text-brand-50" />
            </div>
          </div>

          {siteLinks ? (
            <div className="grid gap-3">
              <Text
                as="p"
                size="caption"
                weight="medium"
                className="text-brand-200/70"
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
                          className="rounded-sm text-body-sm text-brand-100/85 transition-ui hover:text-brand-50 focus-ring"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href as Route}
                          className="rounded-sm text-body-sm text-brand-100/85 transition-ui hover:text-brand-50 focus-ring"
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
                className="text-brand-200/70"
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
                      className="rounded-sm text-body-sm text-brand-100/85 transition-ui hover:text-brand-50 focus-ring"
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
                className="text-brand-200/70"
              >
                Contact
              </Text>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm text-body-sm text-brand-100/85 transition-ui hover:text-brand-50 focus-ring"
              >
                {siteConfig.email}
              </a>
            </div>
          )}
        </div>

        <div className="mt-(--spacing-block) flex flex-col gap-2 border-t border-brand-50/15 pt-(--spacing-stack-md) sm:flex-row sm:items-center sm:justify-between">
          <Text size="caption" className="text-brand-200/65">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <Text size="caption" className="font-mono text-brand-200/65">
            {siteConfig.role}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
