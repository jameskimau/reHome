"use server";

import { redirect } from "next/navigation";

import { refreshPublicCache } from "@/actions/admin/application/refresh-public-cache";
import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import { C_ProductIdDTOSchema } from "@/common/admin/payload/product.dto";
import { fail, type ServerResponseDTO } from "@/common/server-response";
import { requireAdmin } from "@/lib/auth/admin";

/*
==================================================
Date: 2026-10-26 20:28
Purpose: APPLICATION LOGIC - BUSINESS LOGIC LAYER - BEFORE CALLING INFRASTRUCTURE LAYER(PURE DB)
Description: 
==================================================
*/
export async function deleteProduct(input: { id: string }): Promise<ServerResponseDTO<null>> {
  await requireAdmin();

  const parsed = C_ProductIdDTOSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid product id");

  const result = await adminProductRepo.deleteProduct(parsed.data);
  if (!result.success || !result.data) return fail(result.message);

  refreshPublicCache(result.data);
  redirect("/admin");
}
