import "server-only";

import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type PortraitProps = {
  className?: string;
  /** Priority load for LCP when this is the homepage hero image. */
  priority?: boolean;
};

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function portraitFileExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

/**
 * Professional headshot for the hero.
 *
 * Uses `siteConfig.portrait` when the file exists under `/public`; otherwise
 * renders a calm initials placeholder so the layout never looks broken while
 * personal assets are still landing. Server-only `existsSync` keeps the check
 * out of the client bundle.
 */
export function Portrait({ className, priority = false }: PortraitProps) {
  const src = siteConfig.portrait;
  const hasPhoto = Boolean(src) && portraitFileExists(src);
  const initials = initialsFromName(siteConfig.name);
  const alt = `Professional portrait of ${siteConfig.name}`;

  return (
    <figure
      data-slot="portrait"
      className={cn(
        "relative isolate h-full min-h-[20rem] w-full overflow-hidden bg-surface-sunken sm:min-h-[26rem] lg:min-h-0",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-center"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        >
          <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_20%_10%,color-mix(in_oklch,var(--color-brand-400)_34%,transparent),transparent_55%),radial-gradient(90%_70%_at_85%_90%,color-mix(in_oklch,var(--color-brand-700)_22%,transparent),transparent_52%),linear-gradient(165deg,color-mix(in_oklch,var(--color-surface-sunken)_70%,var(--color-brand-100)),var(--color-surface))]" />
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-50" />
          <span className="relative font-heading text-[clamp(4rem,14vw,7.5rem)] font-semibold tracking-tight text-text/25 select-none">
            {initials}
          </span>
          <span className="relative font-mono text-caption tracking-[0.16em] text-text-subtle uppercase">
            Add portrait.jpg
          </span>
        </div>
      )}

      <figcaption className="sr-only">
        {hasPhoto
          ? alt
          : `Portrait placeholder for ${siteConfig.name}. Add an image at ${src}.`}
      </figcaption>
    </figure>
  );
}
