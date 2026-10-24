// Single entry point for product data. Backed by mock data for now; swap the bodies for Prisma
// queries later. Kept async so callers won't change.
import { mockProducts } from "@/data/products";
import type { Category, Product } from "@/types/product";

export interface ProductFilter {
  category?: Category;
  includeSold?: boolean;
}

export async function getProducts({ category, includeSold = false }: ProductFilter = {}): Promise<
  Product[]
> {
  return mockProducts
    .filter((product) => !category || product.category === category)
    .filter((product) => includeSold || !product.isSold)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mockProducts.find((product) => product.slug === slug) ?? null;
}
