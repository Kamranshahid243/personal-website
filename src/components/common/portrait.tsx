import "server-only";

import Image from "next/image";

import { siteConfig } from "@/config/site";
import { publicAssetExists } from "@/lib/public-asset";
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

/**
 * Professional headshot for the hero.
 *
 * Uses `siteConfig.portrait` when the file exists under `/public`; otherwise
 * renders a calm initials mark — never a developer “add file” prompt.
 * Photos use `object-contain` so the full headshot stays visible.
 */
export function Portrait({ className, priority = false }: PortraitProps) {
  const src = siteConfig.portrait;
  const hasPhoto = Boolean(src) && publicAssetExists(src);
  const initials = initialsFromName(siteConfig.name);
  const alt = `Professional portrait of ${siteConfig.name}`;

  return (
    <figure
      data-slot="portrait"
      className={cn(
        "relative isolate flex h-full min-h-0 w-full items-center justify-center overflow-hidden",
        hasPhoto ? "bg-[#3d5a80]" : "bg-surface-sunken",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 28rem"
          className="object-contain object-center"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_18%_8%,color-mix(in_oklch,var(--color-brand-300)_50%,transparent),transparent_58%),radial-gradient(85%_65%_at_90%_90%,color-mix(in_oklch,var(--color-warm-400)_28%,transparent),transparent_50%),linear-gradient(165deg,var(--color-surface-tint),var(--color-surface))]" />
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-30" />
          <span className="relative font-heading text-[clamp(4rem,14vw,7.5rem)] font-semibold tracking-tight text-brand-800/20 select-none dark:text-brand-200/25">
            {initials}
          </span>
        </div>
      )}

      <figcaption className="sr-only">
        {hasPhoto ? alt : `Monogram portrait mark for ${siteConfig.name}`}
      </figcaption>
    </figure>
  );
}
