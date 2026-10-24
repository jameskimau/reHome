import Link from "next/link";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/products";

const LATEST_COUNT = 6;

const LatestArrivals = async () => {
  const products = (await getProducts()).slice(0, LATEST_COUNT);

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="latest-heading" className="bg-muted/40 py-14">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="latest-heading"
            title="Latest arrivals"
            description="Fresh stock goes quickly — call to reserve."
          />
          <Button asChild variant="outline">
            <Link href="/products">View all</Link>
          </Button>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
};

export default LatestArrivals;
