import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Text } from "@/components/ui/typography";
import type { PostSummary } from "@/types/blog";
import { cn } from "@/lib/utils";

type ArticleNavProps = {
  newer: PostSummary | null;
  older: PostSummary | null;
  className?: string;
};

/**
 * Previous / next article links (newer / older in publish order).
 */
export function ArticleNav({ newer, older, className }: ArticleNavProps) {
  if (!newer && !older) return null;

  return (
    <nav
      aria-label="Adjacent articles"
      className={cn(
        "grid gap-4 border-t border-line pt-10 sm:grid-cols-2",
        className,
      )}
    >
      {newer ? (
        <AdjacentLink direction="newer" post={newer} />
      ) : (
        <div className="hidden sm:block" />
      )}
      {older ? <AdjacentLink direction="older" post={older} /> : null}
    </nav>
  );
}

function AdjacentLink({
  direction,
  post,
}: {
  direction: "newer" | "older";
  post: PostSummary;
}) {
  const isNewer = direction === "newer";

  return (
    <Link
      href={`/blog/${post.slug}` as Route}
      rel={isNewer ? "prev" : "next"}
      className={cn(
        "group flex flex-col gap-2 rounded-(--radius-lg) border border-line bg-surface px-5 py-4 transition-ui hover:border-line-strong hover:shadow-raised focus-ring",
        !isNewer && "sm:items-end sm:text-end",
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-caption tracking-[0.1em] text-text-subtle uppercase">
        {isNewer ? (
          <>
            <ArrowLeft className="size-3.5 transition-ui group-hover:-translate-x-0.5" />
            Newer
          </>
        ) : (
          <>
            Older
            <ArrowRight className="size-3.5 transition-ui group-hover:translate-x-0.5" />
          </>
        )}
      </span>
      <Text
        as="span"
        weight="medium"
        className="text-pretty transition-ui group-hover:text-brand-600"
      >
        {post.title}
      </Text>
    </Link>
  );
}
