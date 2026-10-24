import { CATEGORY_META } from "@/lib/catalog";
import { CATEGORIES } from "@/types/product";

export interface NavLink {
  href: string;
  label: string;
}

/** Anchor of the shop listing section on the home page. */
export const SHOP_SECTION_ID = "shop";

/** Anchor of the location section on the about page. */
export const LOCATION_SECTION_ID = "location";

export function getCategoryHref(slug: string): string {
  return `/?category=${slug}#${SHOP_SECTION_ID}`;
}

export const mainNav: NavLink[] = [
  { href: `/#${SHOP_SECTION_ID}`, label: "Shop All" },
  ...CATEGORIES.map((category) => ({
    href: getCategoryHref(CATEGORY_META[category].slug),
    label: CATEGORY_META[category].pluralLabel,
  })),
  { href: "/about", label: "About" },
];
