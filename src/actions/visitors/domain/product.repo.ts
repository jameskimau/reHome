import type { ServerResponseDTO } from "@/common/server-response";
import type { D_FetchProductDetailsDTO } from "@/common/visitors/payload/fetch-product-details.dto";
import type {
  ProductDetailResponse,
  ProductListingResponse,
} from "@/common/visitors/response/product.response";

export interface VisitorProductRepo {
  // All products, newest first. The catalogue is small (~100), so filtering happens in memory.
  fetchProducts(): Promise<ServerResponseDTO<ProductListingResponse[] | null>>;
  // `data: null` with `success: true` means the slug doesn't exist.
  fetchProductDetails(
    payload: D_FetchProductDetailsDTO,
  ): Promise<ServerResponseDTO<ProductDetailResponse | null>>;
}
