import { CATEGORIES, type Category, type Condition, type Product } from "@/types/product";

interface CategoryMeta {
  label: string;
  pluralLabel: string;
  /** Used in URLs, e.g. /products?category=washer */
  slug: string;
  capacityUnit: "kg" | "L";
  tagline: string;
  image: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  WASHER: {
    label: "Washing Machine",
    pluralLabel: "Washing Machines",
    slug: "washer",
    capacityUnit: "kg",
    tagline: "Front and top loaders, drum-cleaned and load-tested.",
    image: "/images/placeholders/washer.svg",
  },
  FRIDGE: {
    label: "Fridge",
    pluralLabel: "Fridges",
    slug: "fridge",
    capacityUnit: "L",
    tagline: "Top mount to side by side, sanitised and temperature-checked.",
    image: "/images/placeholders/fridge.svg",
  },
  DRYER: {
    label: "Dryer",
    pluralLabel: "Dryers",
    slug: "dryer",
    capacityUnit: "kg",
    tagline: "Vented and heat pump dryers, lint paths cleared.",
    image: "/images/placeholders/dryer.svg",
  },
};

export const CONDITION_LABELS: Record<Condition, string> = {
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
};

export function parseCategorySlug(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => CATEGORY_META[category].slug === slug);
}

export function formatCapacity({ capacity, category }: Product): string | undefined {
  return capacity === undefined ? undefined : `${capacity}${CATEGORY_META[category].capacityUnit}`;
}

/** "60 × 85 × 56 cm" (W × H × D), or undefined if any side is missing. */
export function formatDimensions({ widthCm, heightCm, depthCm }: Product): string | undefined {
  if (widthCm === undefined || heightCm === undefined || depthCm === undefined) return undefined;
  return `${widthCm} × ${heightCm} × ${depthCm} cm`;
}
