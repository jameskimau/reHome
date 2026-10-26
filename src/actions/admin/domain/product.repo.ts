import type { ServerResponseDTO } from "@/common/server-response";
import type {
  C_ProductIdDTO,
  C_UpdateProductStatusDTO,
  D_UpsertProductDTO,
} from "@/common/admin/payload/product.dto";
import type {
  AdminProductDetailResponse,
  AdminProductListResponse,
} from "@/common/admin/response/product.response";

/** Slug(s) whose public cache must be refreshed after a write. */
export interface MutatedProduct {
  slug: string;
  previousSlug?: string;
}
/*
==================================================
Date: 2026-10-26 20:14
Purpose: IT ONLY PROVIDES INTERFACE FOR PRODUCT REPO
Description: IT ONLY PROVIDES INTERFACE FOR PRODUCT REPO
==================================================
*/
export interface AdminProductRepo {
  // Every product including SOLD, newest update first.
  fetchProducts(): Promise<ServerResponseDTO<AdminProductListResponse[] | null>>;

  // `data: null` with `success: true` means the id doesn't exist.
  fetchProductById(
    payload: C_ProductIdDTO,
  ): Promise<ServerResponseDTO<AdminProductDetailResponse | null>>;

  createProduct(payload: D_UpsertProductDTO): Promise<ServerResponseDTO<MutatedProduct | null>>;

  updateProduct(
    id: string,
    payload: D_UpsertProductDTO,
  ): Promise<ServerResponseDTO<MutatedProduct | null>>;

  updateProductStatus(
    payload: C_UpdateProductStatusDTO,
  ): Promise<ServerResponseDTO<MutatedProduct | null>>;

  deleteProduct(payload: C_ProductIdDTO): Promise<ServerResponseDTO<MutatedProduct | null>>;
}
