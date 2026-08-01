import Link from "next/link";
import type { Route } from "next";

import { SectionHeading } from "@/components/common/section-heading";
import { BlogCard } from "@/components/cards/blog-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { homeCopy } from "@/data/home";
import type { PostSummary } from "@/types/blog";
import { cn } from "@/lib/utils";

export type LatestBlogPostsSectionProps = {
  posts: readonly PostSummary[];
  className?: string;
};

export function LatestBlogPostsSection({
  posts,
  className,
}: LatestBlogPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  const { blog: copy } = homeCopy;

  return (
    <Section
      id="writing"
      aria-labelledby="writing-heading"
      spacing="lg"
      className={className}
    >
      <Container width="wide">
        <div className="flex reveal-on-scroll flex-col gap-(--spacing-stack-md) sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="writing-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            subheading={copy.subheading}
          />
          <Button
            asChild
            variant="secondary"
            className="shrink-0 self-start sm:self-auto"
          >
            <Link href={"/blog" as Route}>All posts</Link>
          </Button>
        </div>

        <ul className="mt-(--spacing-stack-lg) grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={cn("h-full reveal-on-scroll")}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <BlogCard post={post} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
