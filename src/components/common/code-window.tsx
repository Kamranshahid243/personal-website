import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CodeWindowProps = {
  /** Filename shown in the title bar. */
  title?: string;
  /** Language label, e.g. "ts". Decorative. */
  language?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "title">;

/**
 * Editor chrome around a code block.
 *
 * The traffic-light dots and title bar are what make a snippet feel like a
 * real tool rather than a styled `<pre>`. Purely decorative — the dots have
 * `aria-hidden`, and the accessible name of the content is whatever is inside.
 *
 * Pair with a Shiki-highlighted `<pre>` from the MDX pipeline, or with a
 * hand-authored `<pre><code>` for marketing examples. No JavaScript.
 */
export function CodeWindow({
  title = "index.ts",
  language,
  children,
  className,
  ...props
}: CodeWindowProps) {
  return (
    <div
      data-slot="code-window"
      className={cn(
        "overflow-hidden rounded-(--radius-xl) border border-line bg-surface-raised shadow-raised",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-sunken px-4 py-2.5">
        <div aria-hidden className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 font-mono text-caption text-text-subtle">
          <span className="truncate">{title}</span>
        </div>
        {language ? (
          <span className="font-mono text-caption text-text-subtle uppercase">
            {language}
          </span>
        ) : (
          <span className="w-8" aria-hidden />
        )}
      </div>
      <div
        className={cn(
          "overflow-x-auto",
          // Reset prose pre chrome when nested inside an article.
          "[&_pre]:m-0 [&_pre]:rounded-none [&_pre]:border-0 [&_pre]:bg-transparent",
          "[&_pre]:px-0 [&_pre]:py-4",
          "[&_code]:font-mono [&_code]:text-body-sm [&_code]:leading-relaxed",
        )}
      >
        {children}
      </div>
    </div>
  );
}
