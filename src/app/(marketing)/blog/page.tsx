import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Route } from "next";
import { Rss } from "lucide-react";

import { BlogPagination } from "@/components/blog/blog-pagination";
import { SectionHeading } from "@/components/common/section-heading";
import { BlogCard } from "@/components/cards/blog-card";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import {
  filterPosts,
  getAllCategories,
  getAllPosts,
  getAllTags,
  paginatePosts,
} from "@/lib/content/blog";
import { buildGraph, collectionPageSchema } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const BlogFilters = dynamic(
  () =>
    import("@/components/blog/blog-filters").then((mod) => mod.BlogFilters),
  {
    loading: () => (
      <div
        aria-hidden
        className="h-36 animate-pulse rounded-(--radius-lg) bg-surface-sunken"
      />
    ),
  },
);

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    category?: string;
    q?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Technical writing on Next.js, React, TypeScript, architecture, performance, automation, and AI — practical notes from shipping production software.",
  pathname: "/blog",
  keywords: ["engineering blog", "Next.js", "TypeScript", "React"],
});

/**
 * Writing index — searchable, filterable, paginated MDX articles.
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  const filtered = filterPosts(allPosts, {
    query: params.q,
    tag: params.tag,
    category: params.category,
  });

  const page = Number.parseInt(params.page ?? "1", 10) || 1;
  const { posts, page: currentPage, pageCount, total } = paginatePosts(
    filtered,
    page,
  );

  const retained = new URLSearchParams();
  if (params.q) retained.set("q", params.q);
  if (params.tag) retained.set("tag", params.tag);
  if (params.category) retained.set("category", params.category);
  const retainedQuery = retained.toString();

  return (
    <>
      <JsonLd
        graph={buildGraph(
          collectionPageSchema({
            name: "Blog",
            description:
              "Technical writing on shipping production software.",
            path: "/blog",
            items: allPosts.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
          }),
        )}
      />

      <Section spacing="lg" className="border-b border-line">
        <Container width="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="blog-heading"
              eyebrow="Blog"
              heading="Notes on building production software"
              subheading="Articles on Next.js, React, TypeScript, architecture, performance, and shipping — written for long-form reading, not linkbait."
              className="reveal-on-load max-w-3xl"
              as="h1"
              size="display"
            />
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="reveal-on-load shrink-0 self-start"
            >
              <Link href={"/rss.xml" as Route}>
                <Rss />
                RSS feed
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" aria-labelledby="blog-heading">
        <Container width="wide">
          <div className="reveal-on-scroll mb-(--spacing-stack-lg)">
            <Suspense
              fallback={
                <div
                  aria-hidden
                  className="h-36 animate-pulse rounded-(--radius-lg) bg-surface-sunken"
                />
              }
            >
              <BlogFilters
                categories={categories}
                tags={tags}
                resultCount={total}
                totalCount={allPosts.length}
              />
            </Suspense>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-(--radius-lg) border border-dashed border-line px-6 py-16 text-center">
              <Text as="p" weight="medium">
                No articles match these filters
              </Text>
              <Text as="p" size="sm" tone="muted" className="mt-2">
                Try a broader search, or clear filters to see the full archive.
              </Text>
              <Button asChild variant="secondary" size="sm" className="mt-6">
                <Link href={"/blog" as Route}>Clear filters</Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <li
                    key={post.slug}
                    className={cn("h-full reveal-on-scroll")}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <BlogCard post={post} className="h-full" />
                  </li>
                ))}
              </ul>
              <BlogPagination
                page={currentPage}
                pageCount={pageCount}
                search={retainedQuery}
              />
            </>
          )}
        </Container>
      </Section>

      <CtaSection
        heading="Need this expertise on your product?"
        subheading="Open to full-time roles and select freelance projects. Tell me what you are building."
        secondaryLabel="View projects"
        secondaryHref="/projects"
      />
    </>
  );
}
