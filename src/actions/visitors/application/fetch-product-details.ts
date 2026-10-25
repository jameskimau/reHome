import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { visitorProductRepo } from "@/actions/visitors/infrastructure/product.repo.prisma";
import { fail, type ServerResponseDTO } from "@/common/server-response";
import {
  C_FetchProductDetailsDTOSchema,
  type C_FetchProductDetailsDTO_Input,
  type D_FetchProductDetailsDTO,
} from "@/common/visitors/payload/fetch-product-details.dto";
import type { ProductDetailResponse } from "@/common/visitors/response/product.response";

// RSP - SINGLE RESPONSIBILITY PRINCIPLE - THIS SERVICE IS ONLY FOR VISITORS
async function fetchProductDetailsCached(payload: D_FetchProductDetailsDTO) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${payload.slug}`);

  return visitorProductRepo.fetchProductDetails(payload);
}

export async function fetchProductDetails(
  input: C_FetchProductDetailsDTO_Input,
): Promise<ServerResponseDTO<ProductDetailResponse | null>> {
  const parsed = C_FetchProductDetailsDTOSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid slug");

  return fetchProductDetailsCached(parsed.data);
}
