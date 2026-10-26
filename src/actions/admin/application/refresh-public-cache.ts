import "server-only";

import { updateTag } from "next/cache";

import type { MutatedProduct } from "@/actions/admin/domain/product.repo";

// Expire the visitor caches (see fetch-products / fetch-product-details) so the shop shows the
// change on the next request. Only callable from Server Actions.
export function refreshPublicCache({ slug, previousSlug }: MutatedProduct): void {
  updateTag("products");
  updateTag(`product:${slug}`);
  if (previousSlug && previousSlug !== slug) updateTag(`product:${previousSlug}`);
}
