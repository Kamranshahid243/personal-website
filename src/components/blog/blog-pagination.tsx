import Link from "next/link";
import type { Route } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

type BlogPaginationProps = {
  page: number;
  pageCount: number;
  /** Current query string without `page`, e.g. `tag=Next.js&q=cache`. */
  search?: string;
};

function hrefFor(page: number, search?: string): Route {
  const params = new URLSearchParams(search);
  if (page <= 1) params.delete("page");
  else params.set("page", String(page));
  const query = params.toString();
  return (query ? `/blog?${query}` : "/blog") as Route;
}

/**
 * Page controls for the writing index. Links stay crawlable for SEO.
 */
export function BlogPagination({
  page,
  pageCount,
  search,
}: BlogPaginationProps) {
  if (pageCount <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < pageCount ? page + 1 : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-(--spacing-stack-lg) flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
    >
      <div className="min-w-28">
        {prev ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={hrefFor(prev, search)} rel="prev">
              <ChevronLeft />
              Newer
            </Link>
          </Button>
        ) : null}
      </div>

      <Text as="p" size="sm" tone="muted" aria-live="polite">
        Page {page} of {pageCount}
      </Text>

      <div className="flex min-w-28 justify-end">
        {next ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={hrefFor(next, search)} rel="next">
              Older
              <ChevronRight />
            </Link>
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
