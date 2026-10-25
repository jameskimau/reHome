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
  { href: "/", label: "Home" },
  { href: `/#${SHOP_SECTION_ID}`, label: "Shop" },
  { href: "/about", label: "About" },
  { href: `/about#${LOCATION_SECTION_ID}`, label: "Contact" },
];
