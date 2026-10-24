import type { Metadata } from "next";
import { Suspense } from "react";

import Container from "@/components/common/Container";
import ProductListing from "@/components/product/ProductListing";
import ProductListingSkeleton from "@/components/product/ProductListingSkeleton";

export const metadata: Metadata = {
  title: "Shop Used Appliances",
  description: "Browse tested second-hand washing machines, fridges and dryers.",
};

const ProductsPage = ({ searchParams }: PageProps<"/products">) => {
  return (
    <Container className="space-y-8 py-10">
      <Suspense fallback={<ProductListingSkeleton />}>
        <ProductListing searchParams={searchParams} />
      </Suspense>
    </Container>
  );
};

export default ProductsPage;
