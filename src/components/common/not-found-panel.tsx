import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Eyebrow, Text } from "@/components/ui/typography";
import { primaryCta } from "@/config/navigation";

type NotFoundPanelProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
};

/**
 * Shared recovery UI for 404s — always offers a path back and a contact ask.
 */
export function NotFoundPanel({
  eyebrow = "404",
  heading,
  description,
  primaryLabel,
  primaryHref,
  primaryExternal,
}: NotFoundPanelProps) {
  return (
    <Container
      width="prose"
      className="flex flex-col items-center gap-(--spacing-stack-md) text-center"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Display size="sm">{heading}</Display>
      <Text tone="muted">{description}</Text>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          {primaryExternal ? (
            <a href={primaryHref}>{primaryLabel}</a>
          ) : (
            <Link href={primaryHref as Route}>{primaryLabel}</Link>
          )}
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={primaryCta.href}>{primaryCta.title}</a>
        </Button>
      </div>
    </Container>
  );
}
