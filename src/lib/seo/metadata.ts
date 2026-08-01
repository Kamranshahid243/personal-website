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
  /** Present on articles; promotes the OG type to `article`. */
  publishedTime?: string;
  modifiedTime?: string;
};

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
  publishedTime,
  modifiedTime,
}: CreateMetadataOptions = {}): Metadata {
  const url = new URL(pathname, siteConfig.url).toString();
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const resolvedImage = new URL(
    image ?? `/api/og?title=${encodeURIComponent(title ?? siteConfig.tagline)}`,
    siteConfig.url,
  ).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description,
    keywords: [...siteConfig.keywords, ...(keywords ?? [])],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: { canonical: url },
    openGraph: {
      type: publishedTime ? "article" : "website",
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        { url: resolvedImage, width: 1200, height: 630, alt: resolvedTitle },
      ],
      ...(publishedTime ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
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
