import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleNav } from "@/components/blog/article-nav";
import { ArticleToc } from "@/components/blog/article-toc";
import { BlogCard } from "@/components/cards/blog-card";
import { SectionHeading } from "@/components/common/section-heading";
import { MdxContent } from "@/components/mdx/mdx-content";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { extractHeadings } from "@/lib/content/headings";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/content/blog";
import {
  blogPostingSchema,
  breadcrumbSchema,
  buildGraph,
} from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || (post.draft && process.env.NODE_ENV === "production")) {
    return createMetadata({ title: "Not found", noIndex: true });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    pathname: `/blog/${post.slug}`,
    image: post.image,
    keywords: [post.category, ...post.tags],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    noIndex: post.draft,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || (post.draft && process.env.NODE_ENV === "production")) {
    notFound();
  }

  const [related, adjacent, headings] = await Promise.all([
    getRelatedPosts(post),
    getAdjacentPosts(post.slug),
    Promise.resolve(extractHeadings(post.content)),
  ]);

  const pathname = `/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        graph={buildGraph(
          blogPostingSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            keywords: [post.category, ...post.tags],
            articleSection: post.category,
            wordCount: post.content.split(/\s+/).filter(Boolean).length,
            image: post.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: pathname },
          ]),
        )}
      />

      <article>
        <Section spacing="lg" className="border-b border-line">
          <Container width="prose">
            <ArticleHeader post={post} />
          </Container>
        </Section>

        <Section spacing="lg">
          <Container width="wide">
            <div className="grid gap-(--spacing-stack-lg) lg:grid-cols-[14rem_minmax(0,42rem)] lg:justify-between xl:grid-cols-[16rem_minmax(0,42rem)]">
              <aside className="reveal-on-scroll lg:pt-1">
                <ArticleToc headings={headings} />
              </aside>

              <div className="min-w-0">
                <MdxContent source={post.content} />
                <ArticleNav
                  newer={adjacent.newer}
                  older={adjacent.older}
                  className="mt-12"
                />
              </div>
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section
          spacing="lg"
          surface="sunken"
          aria-labelledby="more-writing-heading"
        >
          <Container width="wide">
            <SectionHeading
              id="more-writing-heading"
              eyebrow="Related"
              heading="Keep reading"
              subheading="Articles that share a tag or category with this one."
              className="reveal-on-scroll"
            />
            <ul className="mt-(--spacing-stack-lg) grid list-none gap-6 p-0 md:grid-cols-2">
              {related.map((entry) => (
                <li key={entry.slug} className="h-full reveal-on-scroll">
                  <BlogCard post={entry} className="h-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        heading="Let’s build your next product"
        subheading="I help teams ship React, Next.js, and automation systems with clear communication and maintainable code."
        secondaryLabel="View projects"
        secondaryHref="/projects"
      />
    </>
  );
}
