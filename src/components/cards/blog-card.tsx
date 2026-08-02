import Link from "next/link";
import type { Route } from "next";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { formatLongDate, formatReadingTime } from "@/lib/format";
import type { PostSummary } from "@/types/blog";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: PostSummary;
  className?: string;
};

/**
 * Writing card.
 *
 * Title and description carry the interest; date, reading time, category and
 * a primary tag carry the scan. Stretched link on the title keeps one tab stop.
 */
export function BlogCard({ post, className }: BlogCardProps) {
  const href = `/blog/${post.slug}` as Route;
  const primaryTag = post.tags[0];

  return (
    <Card interactive className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-caption text-text-muted">
          <Tag variant="brand" className="normal-case tracking-normal">
            {post.category}
          </Tag>
          <time dateTime={post.publishedAt}>
            {formatLongDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{formatReadingTime(post.readingTime)}</span>
        </div>
        <CardTitle as="h2">
          <Link href={href} className="link-overlay rounded-sm focus-ring">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>

      {primaryTag ? (
        <CardFooter>
          <Tag variant="outline">{primaryTag}</Tag>
        </CardFooter>
      ) : null}
    </Card>
  );
}
