import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Heading, Lead, Text } from "@/components/ui/typography";
import { formatLongDate, formatReadingTime } from "@/lib/format";
import type { Post } from "@/types/blog";

type ArticleHeaderProps = {
  post: Post;
};

/**
 * Title block for MDX articles — breadcrumb, metadata, category, tags.
 */
export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="reveal-on-load">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-caption text-text-subtle">
          <li>
            <Link
              href={"/" as Route}
              className="rounded-sm transition-ui hover:text-text focus-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={"/blog" as Route}
              className="rounded-sm transition-ui hover:text-text focus-ring"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text-muted" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6">
        <Link href={"/blog" as Route}>
          <ArrowLeft />
          All articles
        </Link>
      </Button>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-caption text-text-subtle">
        <Tag variant="brand">{post.category}</Tag>
        <time dateTime={post.publishedAt}>
          {formatLongDate(post.publishedAt)}
        </time>
        <span aria-hidden>·</span>
        <span>{formatReadingTime(post.readingTime)}</span>
      </div>

      <Heading as="h1" size="lg" className="mt-3 max-w-3xl">
        {post.title}
      </Heading>
      <Lead className="mt-4 max-w-2xl">{post.description}</Lead>

      {post.tags.length > 0 ? (
        <ul
          className="mt-6 flex list-none flex-wrap gap-2 p-0"
          aria-label="Tags"
        >
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag asChild variant="outline" interactive>
                <Link href={`/blog?tag=${encodeURIComponent(tag)}` as Route}>
                  {tag}
                </Link>
              </Tag>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {post.updatedAt ? (
          <Text as="p" size="sm" tone="subtle">
            Updated {formatLongDate(post.updatedAt)}
          </Text>
        ) : null}
        <Link
          href={
            `/blog?category=${encodeURIComponent(post.category)}` as Route
          }
          className="rounded-sm font-mono text-caption text-text-muted underline-offset-4 transition-ui hover:text-text hover:underline focus-ring"
        >
          More in {post.category}
        </Link>
      </div>
    </header>
  );
}
