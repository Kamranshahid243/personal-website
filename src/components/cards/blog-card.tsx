import Link from "next/link";
import type { Route } from "next";

import { TechStackBadge } from "@/components/common/tech-stack";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
 * Title and description carry the interest; date, reading time and a single
 * tag carry the scan. Same stretched-link pattern as the project card so the
 * whole surface is clickable without nesting interactive elements.
 */
export function BlogCard({ post, className }: BlogCardProps) {
  const href = `/blog/${post.slug}` as Route;
  const primaryTag = post.tags[0];

  return (
    <Card interactive className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-caption text-text-subtle">
          <time dateTime={post.publishedAt}>
            {formatLongDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{formatReadingTime(post.readingTime)}</span>
        </div>
        <CardTitle>
          <Link href={href} className="link-overlay rounded-sm focus-ring">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>

      {primaryTag ? (
        <CardFooter>
          <TechStackBadge>{primaryTag}</TechStackBadge>
        </CardFooter>
      ) : null}
    </Card>
  );
}
