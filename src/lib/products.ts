// Single entry point for product data. Backed by mock data for now; swap the bodies for Prisma
// queries later. Kept async so callers won't change.
import { mockProducts } from "@/data/products";
import {
  CATEGORY_META,
  DEFAULT_SORT,
  PRICE_RANGES,
  isInPriceRange,
  toBrandSlug,
  type SortOption,
} from "@/lib/catalog";
import { CATEGORIES, type Category, type Product } from "@/types/product";

export interface ProductFilter {
  categories?: Category[];
  /** Brand slugs, e.g. "fisher-paykel". */
  brands?: string[];
  /** Price range ids from PRICE_RANGES. */
  priceRanges?: string[];
  sort?: SortOption;
  includeSold?: boolean;
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface ProductFacets {
  categories: FacetOption[];
  brands: FacetOption[];
  priceRanges: FacetOption[];
}

const SORT_COMPARATORS: Record<SortOption, (a: Product, b: Product) => number> = {
  newest: (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

export async function getProducts({
  categories = [],
  brands = [],
  priceRanges = [],
  sort = DEFAULT_SORT,
  includeSold = false,
}: ProductFilter = {}): Promise<Product[]> {
  const ranges = PRICE_RANGES.filter((range) => priceRanges.includes(range.id));

  return mockProducts
    .filter((product) => includeSold || !product.isSold)
    .filter((product) => categories.length === 0 || categories.includes(product.category))
    .filter((product) => brands.length === 0 || brands.includes(toBrandSlug(product.brand)))
    .filter(
      (product) =>
        ranges.length === 0 || ranges.some((range) => isInPriceRange(product.price, range)),
    )
    .sort(SORT_COMPARATORS[sort]);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mockProducts.find((product) => product.slug === slug) ?? null;
}

/** Filter options with counts across all in-stock products. */
export async function getProductFacets(): Promise<ProductFacets> {
  const products = await getProducts();
  const countWhere = (predicate: (product: Product) => boolean) =>
    products.filter(predicate).length;

  const brandNames = [...new Set(products.map((product) => product.brand))].sort();

  return {
    categories: CATEGORIES.map((category) => ({
      value: CATEGORY_META[category].slug,
      label: CATEGORY_META[category].pluralLabel,
      count: countWhere((product) => product.category === category),
    })),
    brands: brandNames.map((brand) => ({
      value: toBrandSlug(brand),
      label: brand,
      count: countWhere((product) => product.brand === brand),
    })),
    priceRanges: PRICE_RANGES.map((range) => ({
      value: range.id,
      label: range.label,
      count: countWhere((product) => isInPriceRange(product.price, range)),
    })),
  };
}
