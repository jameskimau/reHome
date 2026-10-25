import type { Category, Condition, ProductStatus } from "@/generated/prisma/enums";

// ------------------------------------------------------------------------------------------------
// RESPONSE - public product shapes. Plain types: the data comes from our own DB via Prisma, so
// there is nothing to validate. Admin-only columns (e.g. `note`) must never be added here.
// The repo's select objects are checked against these keys at compile time.
// ------------------------------------------------------------------------------------------------

/** What a product card, the filters/sort, Hero and sitemap need. */
export interface ProductListingResponse {
  id: string;
  slug: string;
  title: string;
  category: Category;
  brand: string;
  /** Kilograms for washers/dryers, litres for fridges. */
  capacity: number | null;
  /** Selling price in whole Australian dollars. */
  price: number;
  /** Original price shown struck through; null when not discounted. */
  compareAtPrice: number | null;
  status: ProductStatus;
  /** Hand-picked deal; drives the Special ribbon and filter. */
  isSpecial: boolean;
  /** Ordered image URLs; the first is the cover image. */
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Everything public, for the product detail page. */
export interface ProductDetailResponse extends ProductListingResponse {
  model: string;
  condition: Condition;
  widthCm: number | null;
  heightCm: number | null;
  depthCm: number | null;
  /** Australian energy star rating, e.g. 4.5. */
  energyRating: number | null;
  warrantyMonths: number | null;
  description: string;
  soldAt: Date | null;
}
