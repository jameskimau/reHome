import type { ProductDetailResponse } from "@/common/visitors/response/product.response";
import type { Category, ProductStatus } from "@/generated/prisma/enums";

// ------------------------------------------------------------------------------------------------
// RESPONSE - admin product shapes. Unlike the visitor types these include `note`.
// The repo's select objects are checked against these keys at compile time.
// ------------------------------------------------------------------------------------------------

/** One row of the admin product table. */
export interface AdminProductListResponse {
  id: string;
  slug: string;
  title: string;
  category: Category;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  status: ProductStatus;
  isSpecial: boolean;
  images: string[];
  note: string | null;
  updatedAt: Date;
}

/** Every column; used as the edit form's initial values. */
export interface AdminProductDetailResponse extends ProductDetailResponse {
  note: string | null;
}
