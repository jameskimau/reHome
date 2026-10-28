import "server-only";

import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import { requireAdmin } from "@/lib/auth/admin";

// Not cached: includes admin-only notes and must always be current.
export async function fetchAdminProducts() {
  await requireAdmin();
  return adminProductRepo.fetchProducts();
}
