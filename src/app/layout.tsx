import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { fontVariables } from "@/lib/fonts";
import { buildGraph, personSchema, websiteSchema } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

/** Defaults for every route; individual pages override via `createMetadata`. */
export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  // Matched to the page background so mobile browser chrome blends into the
  // page in both themes.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#142422" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* `suppressHydrationWarning` is required by next-themes: it writes the
       theme class onto <html> before React hydrates, which is precisely what
       prevents a flash of the wrong theme. */
    <html lang="en" suppressHydrationWarning className={cn(fontVariables)}>
      <body className="flex min-h-dvh flex-col">
        {/* First tab stop on every page. The `#main` target is provided by
            each route group's layout. */}
        <a
          href="#main"
          className="sr-only-focusable focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:border focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <JsonLd graph={buildGraph(personSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
