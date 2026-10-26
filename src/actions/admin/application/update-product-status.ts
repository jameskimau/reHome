"use server";

import { refreshPublicCache } from "@/actions/admin/application/refresh-public-cache";
import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import { C_UpdateProductStatusDTOSchema } from "@/common/admin/payload/product.dto";
import { fail, ok, type ServerResponseDTO } from "@/common/server-response";

export async function updateProductStatus(input: {
  id: string;
  status: string;
}): Promise<ServerResponseDTO<null>> {
  // TODO(neon-auth): require an admin session.

  const parsed = C_UpdateProductStatusDTOSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid status");

  const result = await adminProductRepo.updateProductStatus(parsed.data);
  if (!result.success || !result.data) return fail(result.message);

  refreshPublicCache(result.data);
  return ok(null, result.message);
}
