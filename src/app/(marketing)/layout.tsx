import type { ReactNode } from "react";

import { GrainOverlay } from "@/components/common/animated-background";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/**
 * Marketing shell: sticky header, main landmark, footer, film grain.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main" className="relative flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
