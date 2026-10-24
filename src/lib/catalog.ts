import { CATEGORIES, type Category, type Condition } from "@/types/product";

interface CategoryMeta {
  label: string;
  pluralLabel: string;
  /** Used in URLs, e.g. /products?category=washer */
  slug: string;
  capacityUnit: "kg" | "L";
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  WASHER: {
    label: "Washing Machine",
    pluralLabel: "Washing Machines",
    slug: "washer",
    capacityUnit: "kg",
  },
  FRIDGE: { label: "Fridge", pluralLabel: "Fridges", slug: "fridge", capacityUnit: "L" },
  DRYER: { label: "Dryer", pluralLabel: "Dryers", slug: "dryer", capacityUnit: "kg" },
};

export const CONDITION_LABELS: Record<Condition, string> = {
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
};

export function parseCategorySlug(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => CATEGORY_META[category].slug === slug);
}
