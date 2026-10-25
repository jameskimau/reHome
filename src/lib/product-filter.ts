// Pure in-memory filtering, sorting and facet counts over the full product list. The catalogue is
// small (~100 items), so the listing fetches everything once and narrows it here.
import type { ProductListingResponse } from "@/common/visitors/response/product.response";
import type { Category } from "@/generated/prisma/enums";
import {
  CATEGORIES,
  CATEGORY_META,
  DEFAULT_SORT,
  PRICE_RANGES,
  isInPriceRange,
  toBrandSlug,
  type SortOption,
} from "@/lib/catalog";
import { SPECIAL_VALUE } from "@/lib/product-query";

export interface ProductFilter {
  /** Only hand-picked specials. */
  specialOnly?: boolean;
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
  specials: FacetOption[];
  categories: FacetOption[];
  brands: FacetOption[];
  priceRanges: FacetOption[];
}

const SORT_COMPARATORS: Record<SortOption, (a: ProductListingResponse, b: ProductListingResponse) => number> = {
  newest: (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

export function isSold(product: ProductListingResponse): boolean {
  return product.status === "SOLD";
}

export function filterProducts(
  products: ProductListingResponse[],
  {
    specialOnly = false,
    categories = [],
    brands = [],
    priceRanges = [],
    sort = DEFAULT_SORT,
    includeSold = false,
  }: ProductFilter = {},
): ProductListingResponse[] {
  const ranges = PRICE_RANGES.filter((range) => priceRanges.includes(range.id));

  return products
    .filter((product) => includeSold || !isSold(product))
    .filter((product) => !specialOnly || product.isSpecial)
    .filter((product) => categories.length === 0 || categories.includes(product.category))
    .filter((product) => brands.length === 0 || brands.includes(toBrandSlug(product.brand)))
    .filter(
      (product) =>
        ranges.length === 0 || ranges.some((range) => isInPriceRange(product.price, range)),
    )
    .sort(SORT_COMPARATORS[sort]);
}

/** Filter options with counts across all in-stock products. */
export function getProductFacets(allProducts: ProductListingResponse[]): ProductFacets {
  const products = filterProducts(allProducts);
  const countWhere = (predicate: (product: ProductListingResponse) => boolean) =>
    products.filter(predicate).length;

  const brandNames = [...new Set(products.map((product) => product.brand))].sort();

  return {
    specials: [
      {
        value: SPECIAL_VALUE,
        label: "Specials only",
        count: countWhere((product) => product.isSpecial),
      },
    ],
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
