import { Text } from "@/components/ui/typography";
import type { TocHeading } from "@/lib/content/headings";
import { cn } from "@/lib/utils";

type ArticleTocProps = {
  headings: readonly TocHeading[];
  className?: string;
};

/**
 * Outline for long-form articles. Anchors match `rehype-slug` ids on the body.
 */
export function ArticleToc({ headings, className }: ArticleTocProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-(--radius-lg) border border-line bg-surface-sunken/50 p-5 lg:sticky lg:top-24 lg:border-0 lg:bg-transparent lg:p-0",
        className,
      )}
    >
      <Text
        as="p"
        size="sm"
        weight="medium"
        className="font-mono tracking-[0.12em] text-text-subtle uppercase"
      >
        On this page
      </Text>
      <ol className="mt-4 grid list-none gap-2 p-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block rounded-sm text-body-sm text-text-muted transition-ui hover:text-text focus-ring",
                heading.level === 3 && "ps-3",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
