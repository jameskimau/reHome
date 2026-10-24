// Mirrors the future Prisma `Product` model so the data source can be swapped without touching UI.

export const CATEGORIES = ["WASHER", "FRIDGE", "DRYER"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = ["LIKE_NEW", "GOOD", "FAIR"] as const;
export type Condition = (typeof CONDITIONS)[number];

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  brand: string;
  model: string;
  /** Whole Australian dollars. */
  price: number;
  condition: Condition;
  /** Kilograms for washers/dryers, litres for fridges. */
  capacity?: number;
  widthCm?: number;
  heightCm?: number;
  depthCm?: number;
  /** Australian energy star rating, e.g. 4.5. */
  energyRating?: number;
  warrantyMonths?: number;
  images: string[];
  description: string;
  isSold: boolean;
  createdAt: Date;
}
