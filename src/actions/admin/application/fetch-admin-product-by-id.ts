import "server-only";

import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import { C_ProductIdDTOSchema } from "@/common/admin/payload/product.dto";
import { fail } from "@/common/server-response";
import { requireAdmin } from "@/lib/auth/admin";

// Not cached: the edit form must always start from the latest values.
export async function fetchAdminProductById(input: { id: string }) {
  await requireAdmin();

  const parsed = C_ProductIdDTOSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid product id");

  return adminProductRepo.fetchProductById(parsed.data);
}
