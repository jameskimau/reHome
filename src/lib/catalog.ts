import { CATEGORIES, type Category, type Condition, type Product } from "@/types/product";

interface CategoryMeta {
  label: string;
  pluralLabel: string;
  /** Used in URLs, e.g. /?category=washer */
  slug: string;
  capacityUnit: "kg" | "L";
  image: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  WASHER: {
    label: "Washing Machine",
    pluralLabel: "Washing Machines",
    slug: "washer",
    capacityUnit: "kg",
    image: "/images/placeholders/washer.svg",
  },
  FRIDGE: {
    label: "Fridge",
    pluralLabel: "Fridges",
    slug: "fridge",
    capacityUnit: "L",
    image: "/images/placeholders/fridge.svg",
  },
  DRYER: {
    label: "Dryer",
    pluralLabel: "Dryers",
    slug: "dryer",
    capacityUnit: "kg",
    image: "/images/placeholders/dryer.svg",
  },
};

export const CONDITION_LABELS: Record<Condition, string> = {
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
};

export interface PriceRange {
  /** Used in URLs, e.g. /?price=300-600 */
  id: string;
  label: string;
  min: number;
  /** Exclusive. Omit for an open-ended range. */
  max?: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { id: "under-300", label: "Under $300", min: 0, max: 300 },
  { id: "300-600", label: "$300 – $600", min: 300, max: 600 },
  { id: "600-900", label: "$600 – $900", min: 600, max: 900 },
  { id: "900-plus", label: "$900+", min: 900 },
];

export const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["id"];
export const DEFAULT_SORT: SortOption = "newest";

export function parseCategorySlug(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => CATEGORY_META[category].slug === slug);
}

export function isInPriceRange(price: number, { min, max }: PriceRange): boolean {
  return price >= min && (max === undefined || price < max);
}

/** "Fisher & Paykel" → "fisher-paykel" */
export function toBrandSlug(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatCapacity({ capacity, category }: Product): string | undefined {
  return capacity === undefined ? undefined : `${capacity}${CATEGORY_META[category].capacityUnit}`;
}

/** "60 × 85 × 56 cm" (W × H × D), or undefined if any side is missing. */
export function formatDimensions({ widthCm, heightCm, depthCm }: Product): string | undefined {
  if (widthCm === undefined || heightCm === undefined || depthCm === undefined) return undefined;
  return `${widthCm} × ${heightCm} × ${depthCm} cm`;
}
