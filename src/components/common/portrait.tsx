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
        "relative isolate h-full min-h-[22rem] w-full overflow-hidden bg-surface-sunken sm:min-h-[28rem] lg:min-h-0",
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
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_20%,color-mix(in_oklch,var(--color-brand-400)_28%,transparent),transparent_55%),radial-gradient(80%_60%_at_80%_80%,color-mix(in_oklch,var(--color-brand-600)_18%,transparent),transparent_50%),linear-gradient(160deg,var(--color-surface-sunken),var(--color-surface))]" />
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-40" />
          <span className="relative font-heading text-[clamp(4.5rem,12vw,7rem)] font-semibold tracking-tight text-text/20 select-none">
            {initials}
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
