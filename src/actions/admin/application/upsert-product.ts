"use server";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { refreshPublicCache } from "@/actions/admin/application/refresh-public-cache";
import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import type { FormState } from "@/common/admin/form-state";
import {
  C_UpsertProductDTOSchema,
  type D_UpsertProductDTO,
} from "@/common/admin/payload/product.dto";
import { toBrandSlug as slugify } from "@/lib/catalog";

const SLUG_TAKEN = "That slug is already in use";

async function save(id: string | null, payload: D_UpsertProductDTO) {
  return id ? adminProductRepo.updateProduct(id, payload) : adminProductRepo.createProduct(payload);
}

/** Create when `id` is null, otherwise update. Bind `id` before passing to useActionState. */
export async function upsertProduct(
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authBaseUrl = process.env.NEON_AUTH_BASE_URL;
  const cookieHeader = (await cookies()).toString();
  if (!authBaseUrl || !cookieHeader) redirect("/admin/login");

  const sessionResponse = await fetch(`${authBaseUrl}/api/auth/get-session`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!sessionResponse.ok) redirect("/admin/login");

  const session = (await sessionResponse.json()) as {
    user?: { role?: string };
  } | null;
  if (session?.user?.role !== "admin") redirect("/admin/login");

  const raw = Object.fromEntries(formData);
  const values = Object.fromEntries(
    Object.entries(raw).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );

  const parsed = C_UpsertProductDTOSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the highlighted fields",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const generated = parsed.data.slug === null;
  const baseSlug = parsed.data.slug ?? slugify(parsed.data.title);
  let result = await save(id, { ...parsed.data, slug: baseSlug });

  // A generated slug can clash with a similar listing; retry once with a short suffix.
  if (!result.success && generated && result.message === SLUG_TAKEN) {
    const suffix = randomBytes(2).toString("hex");
    result = await save(id, { ...parsed.data, slug: `${baseSlug}-${suffix}` });
  }

  if (!result.success || !result.data) {
    return {
      success: false,
      message: result.message,
      fieldErrors: result.message === SLUG_TAKEN ? { slug: [SLUG_TAKEN] } : undefined,
      values,
    };
  }

  refreshPublicCache(result.data);
  redirect("/admin");
}
