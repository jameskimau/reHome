import "server-only";

import { connection } from "next/server";

import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";

// Not cached: includes admin-only notes and must always be current.
export async function fetchAdminProducts() {
  // TODO(neon-auth): require an admin session.
  await connection();
  return adminProductRepo.fetchProducts();
}
