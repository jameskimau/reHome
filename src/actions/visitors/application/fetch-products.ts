import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { visitorProductRepo } from "@/actions/visitors/infrastructure/product.repo.prisma";

// Admin mutations should call revalidateTag("products").
export async function fetchProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  return visitorProductRepo.fetchProducts();
}
