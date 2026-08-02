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
import { siteConfig } from "@/config/site";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/types/content";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

/**
 * Packaged freelance offer with a direct inquire CTA.
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  const IconComponent = getIcon(service.icon);
  const inquireHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Inquiry: ${service.title}`,
  )}`;

  return (
    <Card
      interactive
      className={cn(
        "h-full max-h-[100svh] lg:max-h-(--viewport-content)",
        className,
      )}
    >
      <CardHeader>
        <div className="mb-1 flex size-10 items-center justify-center rounded-(--radius-lg) bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
          <Icon icon={IconComponent} size="md" />
        </div>
        <CardTitle as="h2">
          <a href={inquireHref} className="link-overlay rounded-sm focus-ring">
            {service.title}
          </a>
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

      <CardFooter className="relative z-10 justify-between">
        {service.startingAt ? (
          <Text size="sm" weight="medium">
            {service.startingAt}
          </Text>
        ) : (
          <span />
        )}
        <span
          aria-hidden
          className="inline-flex items-center gap-1 text-body-sm font-medium text-text-muted transition-ui"
        >
          Inquire
          <ArrowUpRight className="size-3.5" />
        </span>
      </CardFooter>
    </Card>
  );
}
