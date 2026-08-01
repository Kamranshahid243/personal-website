"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { Route } from "next";

import { NavLinks } from "@/components/layout/nav-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Mobile navigation drawer.
 *
 * Controlled Sheet so a link click closes it. Hidden from `md` up.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100%,20rem)] gap-0 border-line bg-surface"
      >
        <SheetHeader className="border-b border-line">
          <SheetTitle className="font-heading text-body-md">
            {siteConfig.shortName}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-2 py-4">
          <NavLinks
            items={mainNav}
            size="lg"
            className="flex-col items-stretch"
            onNavigate={() => setOpen(false)}
          />
        </nav>

        <div className="mt-auto border-t border-line p-4">
          <Button asChild size="lg" block>
            {primaryCta.external ? (
              <a href={primaryCta.href} onClick={() => setOpen(false)}>
                {primaryCta.title}
              </a>
            ) : (
              <Link
                href={primaryCta.href as Route}
                onClick={() => setOpen(false)}
              >
                {primaryCta.title}
              </Link>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
