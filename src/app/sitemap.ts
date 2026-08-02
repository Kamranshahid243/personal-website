import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/content/blog";

/**
 * Generated sitemap for the three-surface IA.
 * Drafts are filtered out by `getAllPosts` in production.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const newestPostDate = posts[0]
    ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
    : undefined;
  const newestProjectYear = projects.reduce(
    (max, project) => Math.max(max, project.year),
    2024,
  );
  const newestProjectDate = new Date(`${newestProjectYear}-01-01T00:00:00.000Z`);
  const siteLastModified =
    newestPostDate && newestPostDate > newestProjectDate
      ? newestPostDate
      : newestProjectDate;

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: newestProjectDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: newestPostDate ?? siteLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(`${project.year}-01-01T00:00:00.000Z`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
