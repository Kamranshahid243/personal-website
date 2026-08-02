"use client";

import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { Text } from "@/components/ui/typography";
import type { BlogCategory } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type BlogFiltersProps = {
  categories: readonly { category: BlogCategory; count: number }[];
  tags: readonly { tag: string; count: number }[];
  resultCount: number;
  totalCount: number;
};

/**
 * Search + category/tag filters for the writing index.
 *
 * State lives in the URL (`q`, `category`, `tag`, `page`) so filtered views
 * are shareable and survive refresh — important for a SEO-facing index.
 */
export function BlogFilters({
  categories,
  tags,
  resultCount,
  totalCount,
}: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(patch)) {
        if (!value) params.delete(key);
        else params.set(key, value);
      }

      if ("q" in patch || "category" in patch || "tag" in patch) {
        params.delete("page");
      }

      const next = params.toString();
      const href = next ? `${pathname}?${next}` : pathname;
      startTransition(() => {
        router.replace(href as Parameters<typeof router.replace>[0], {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const next = query.trim();
      if (next === urlQuery) return;
      updateParams({ q: next || null });
    }, 200);

    return () => window.clearTimeout(handle);
  }, [query, urlQuery, updateParams]);

  const hasActiveFilters = Boolean(query || category || tag);

  return (
    <div
      className={cn(
        "flex flex-col gap-(--spacing-stack-md)",
        isPending && "opacity-70",
      )}
    >
      <div className="relative max-w-xl">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-text-subtle"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="ps-10"
        />
      </div>

      {categories.length > 0 ? (
        <FilterRow label="Category">
          <FilterChip
            label="All"
            selected={!category}
            onClick={() => updateParams({ category: null })}
          />
          {categories.map((item) => (
            <FilterChip
              key={item.category}
              label={item.category}
              selected={category === item.category}
              onClick={() =>
                updateParams({
                  category:
                    category === item.category ? null : item.category,
                })
              }
            />
          ))}
        </FilterRow>
      ) : null}

      {tags.length > 0 ? (
        <FilterRow label="Tags">
          <FilterChip
            label="All"
            selected={!tag}
            onClick={() => updateParams({ tag: null })}
          />
          {tags.map((item) => (
            <FilterChip
              key={item.tag}
              label={item.tag}
              selected={tag === item.tag}
              onClick={() =>
                updateParams({ tag: tag === item.tag ? null : item.tag })
              }
            />
          ))}
        </FilterRow>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Text as="p" size="sm" tone="muted" aria-live="polite">
          {resultCount === totalCount
            ? `${totalCount} article${totalCount === 1 ? "" : "s"}`
            : `${resultCount} of ${totalCount} articles`}
        </Text>
        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              updateParams({ q: null, category: null, tag: null });
            }}
          >
            <X />
            Clear filters
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
      <Text
        as="span"
        size="sm"
        weight="medium"
        className="shrink-0 pt-1.5 font-mono tracking-[0.1em] text-text-muted uppercase sm:w-24"
      >
        {label}
      </Text>
      <div
        role="group"
        aria-label={`${label} filters`}
        className="flex flex-wrap gap-2"
      >
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Tag
      asChild
      variant="outline"
      interactive
      selected={selected}
      className={cn(selected && "shadow-subtle")}
    >
      <button type="button" onClick={onClick} aria-pressed={selected}>
        {label}
      </button>
    </Tag>
  );
}
