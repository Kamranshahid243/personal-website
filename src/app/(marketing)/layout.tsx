import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/**
 * Marketing shell: sticky header, main landmark, footer.
 *
 * Every public page that is trying to convert a visitor mounts here. The skip
 * link in the root layout targets `#main`, so that id is non-negotiable.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
