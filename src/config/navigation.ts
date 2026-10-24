import { CATEGORY_META } from "@/lib/catalog";
import { CATEGORIES } from "@/types/product";

export interface NavLink {
  href: string;
  label: string;
}

export function getCategoryHref(slug: string): string {
  return `/products?category=${slug}`;
}

export const mainNav: NavLink[] = [
  { href: "/products", label: "Shop All" },
  ...CATEGORIES.map((category) => ({
    href: getCategoryHref(CATEGORY_META[category].slug),
    label: CATEGORY_META[category].pluralLabel,
  })),
  { href: "/about", label: "About" },
];
