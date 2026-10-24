import { Suspense } from "react";

import Container from "@/components/common/Container";
import ProductListing from "@/components/product/ProductListing";
import ProductListingSkeleton from "@/components/product/ProductListingSkeleton";
import { SHOP_SECTION_ID } from "@/config/navigation";

interface ShopSectionProps {
  searchParams: PageProps<"/">["searchParams"];
}

const ShopSection = ({ searchParams }: ShopSectionProps) => {
  return (
    // scroll-mt keeps the section clear of the sticky header when jumping to #shop.
    <section id={SHOP_SECTION_ID} aria-label="Shop" className="scroll-mt-16 py-10">
      <Container>
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListing searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
};

export default ShopSection;
