import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const statusVariant = {
  open: "brand",
  limited: "warning",
  closed: "neutral",
} as const;

/**
 * Availability indicator, driven by `siteConfig.availability`.
 *
 * One place so the header, the contact page and the CTA never disagree about
 * whether you are taking work. The animated pulse on the open state is CSS
 * only and stops under prefers-reduced-motion.
 */
export function AvailabilityBadge({ className }: { className?: string }) {
  const { status, label } = siteConfig.availability;

  return (
    <Badge
      variant={statusVariant[status]}
      className={cn("tracking-normal normal-case", className)}
    >
      {status === "open" ? (
        <span
          aria-hidden
          className="size-1.5 animate-pulse-subtle rounded-full bg-brand-500"
        />
      ) : null}
      {label}
    </Badge>
  );
}
