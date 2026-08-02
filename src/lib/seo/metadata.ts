import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. `/blog/my-post`. */
  pathname?: string;
  /** Absolute or root-relative image URL. Defaults to the generated OG image. */
  image?: string;
  keywords?: string[];
  /** Set on drafts, thank-you pages and anything that should not be indexed. */
  noIndex?: boolean;
  /**
   * Open Graph type. Defaults to `article` when `publishedTime` is set,
   * otherwise `website`. Pass explicitly for case studies that have dates
   * but should not be typed as articles.
   */
  ogType?: "website" | "article" | "profile";
  /** Present on articles; also sets OG article timestamps when `ogType` is article. */
  publishedTime?: string;
  modifiedTime?: string;
};

function twitterHandleFromUrl(url: string): string | undefined {
  try {
    const { pathname } = new URL(url);
    const handle = pathname.replace(/^\/+/, "").split("/")[0];
    return handle ? `@${handle}` : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Builds a complete, consistent metadata object for a route.
 *
 * Every page calls this instead of hand-writing a `Metadata` literal, which is
 * what guarantees canonical URLs, OG tags and Twitter cards are never
 * accidentally omitted on the one page that gets shared the most.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  pathname = "/",
  image,
  keywords,
  noIndex = false,
  ogType,
  publishedTime,
  modifiedTime,
}: CreateMetadataOptions = {}): Metadata {
  const url = new URL(pathname, siteConfig.url).toString();
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const resolvedImage = new URL(
    image ??
      (title
        ? `/api/og?title=${encodeURIComponent(title)}&eyebrow=${encodeURIComponent(siteConfig.role)}`
        : siteConfig.ogImage),
    siteConfig.url,
  ).toString();
  const resolvedOgType = ogType ?? (publishedTime ? "article" : "website");
  const twitterHandle = twitterHandleFromUrl(siteConfig.links.x);

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description,
    keywords: [...siteConfig.keywords, ...(keywords ?? [])],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    applicationName: siteConfig.shortName,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${siteConfig.url}/rss.xml`,
      },
    },
    openGraph: {
      type: resolvedOgType,
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
          type: "image/png",
        },
      ],
      ...(resolvedOgType === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.name],
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
      ...(twitterHandle
        ? { site: twitterHandle, creator: twitterHandle }
        : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false, noimageindex: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
