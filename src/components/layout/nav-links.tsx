"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

import { mainNav, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  items?: NavItem[];
  className?: string;
  /** Called after a link is activated — used by the mobile sheet to close. */
  onNavigate?: () => void;
  /** Larger hit targets and type for the mobile sheet. */
  size?: "sm" | "lg";
};

/**
 * Primary navigation links with active-state highlighting.
 *
 * Client component because `usePathname` is the only honest way to know which
 * route is current. Kept tiny so the rest of the header can stay a server
 * component.
 */
export function NavLinks({
  items = mainNav,
  className,
  onNavigate,
  size = "sm",
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <li key={item.href}>
            <Link
              href={item.href as Route}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md font-medium focus-ring transition-ui",
                size === "sm" && "px-3 py-2 text-body-sm",
                size === "lg" && "block px-3 py-3 text-heading-sm",
                active ? "text-text" : "text-text-muted hover:text-text",
              )}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
