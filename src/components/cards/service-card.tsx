import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/types/content";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
  /**
   * Where the card navigates. Omit (or pass null) for a static card — used on
   * the homepage while a dedicated services route is out of scope.
   */
  href?: string | null;
};

/**
 * Packaged freelance offer.
 *
 * Concrete scope over vague capability: the title and deliverables let a
 * business owner recognise their problem before they write the email.
 */
export function ServiceCard({
  service,
  className,
  href = null,
}: ServiceCardProps) {
  const IconComponent = getIcon(service.icon);
  const linked = Boolean(href);

  return (
    <Card interactive={linked} className={cn("h-full", className)}>
      <CardHeader>
        <div className="mb-1 flex size-10 items-center justify-center rounded-(--radius-lg) bg-surface-sunken text-text">
          <Icon icon={IconComponent} size="md" tone="muted" />
        </div>
        <CardTitle>
          {linked && href ? (
            <Link
              href={href as Route}
              className="link-overlay rounded-sm focus-ring"
            >
              {service.title}
            </Link>
          ) : (
            service.title
          )}
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>

      {service.deliverables.length > 0 ? (
        <CardContent>
          <ul className="grid gap-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-body-sm text-text-muted"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-text-subtle"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      ) : null}

      <CardFooter className="justify-between">
        {service.startingAt ? (
          <Text size="sm" weight="medium">
            {service.startingAt}
          </Text>
        ) : (
          <span />
        )}
        {linked ? (
          <span className="inline-flex items-center gap-1 text-body-sm font-medium text-text-muted">
            Learn more
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        ) : null}
      </CardFooter>
    </Card>
  );
}
