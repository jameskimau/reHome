import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LocalBusinessJsonLd from "@/components/layout/LocalBusinessJsonLd";
import MobileCallBar from "@/components/layout/MobileCallBar";

// Public shop header/footer. Used by the (site) layout and the root not-found page; admin has its own.
const SiteChrome = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      {/* Bottom padding keeps content clear of the mobile call bar. */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileCallBar />
    </>
  );
};

export default SiteChrome;
