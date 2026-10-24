import type { ReactNode } from "react";

import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  /** Shown when there are no products. */
  emptyState?: ReactNode;
}

const ProductGrid = ({ products, emptyState }: ProductGridProps) => {
  if (products.length === 0) return emptyState ?? null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
