// Converts between the shop URL (home page) and a typed query. Multi-select values are comma-separated,
// e.g. /?category=washer,fridge&brand=lg&price=under-300&sort=price-asc
import {
  DEFAULT_SORT,
  PRICE_RANGES,
  SORT_OPTIONS,
  parseCategorySlug,
  type SortOption,
} from "@/lib/catalog";
import type { ProductFilter } from "@/lib/products";
import type { Category } from "@/types/product";

/** URL-level values: category slugs, brand slugs, price range ids. */
export interface ProductQuery {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  sort: SortOption;
}

export type FilterKey = "categories" | "brands" | "priceRanges";

export const EMPTY_QUERY: ProductQuery = {
  categories: [],
  brands: [],
  priceRanges: [],
  sort: DEFAULT_SORT,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readList(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isSortOption(value: unknown): value is SortOption {
  return SORT_OPTIONS.some((option) => option.id === value);
}

export function parseProductQuery(params: SearchParams): ProductQuery {
  return {
    categories: readList(params.category).filter((slug) => parseCategorySlug(slug) !== undefined),
    brands: readList(params.brand),
    priceRanges: readList(params.price).filter((id) =>
      PRICE_RANGES.some((range) => range.id === id),
    ),
    sort: isSortOption(params.sort) ? params.sort : DEFAULT_SORT,
  };
}

/** The shop listing lives on the home page. */
export function buildShopHref(query: ProductQuery): string {
  const entries: [string, string][] = [
    ["category", query.categories.join(",")],
    ["brand", query.brands.join(",")],
    ["price", query.priceRanges.join(",")],
    ["sort", query.sort === DEFAULT_SORT ? "" : query.sort],
  ];
  const params = entries
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%2C/g, ",")}`)
    .join("&");

  return params ? `/?${params}` : "/";
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function countActiveFilters(query: ProductQuery): number {
  return query.categories.length + query.brands.length + query.priceRanges.length;
}

export function toProductFilter(query: ProductQuery): ProductFilter {
  return {
    categories: query.categories
      .map(parseCategorySlug)
      .filter((category): category is Category => category !== undefined),
    brands: query.brands,
    priceRanges: query.priceRanges,
    sort: query.sort,
  };
}
