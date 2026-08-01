import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/content/blog";

/**
 * Generated sitemap.
 *
 * Derived from the same content layer the pages render from, so a new article
 * or case study is discoverable the moment it is merged — no manual list to
 * forget to update. Drafts are already filtered out upstream by `getAllPosts`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.9 },
  ];

  const posts = await getAllPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
