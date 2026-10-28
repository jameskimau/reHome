"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";

import { refreshPublicCache } from "@/actions/admin/application/refresh-public-cache";
import { adminProductRepo } from "@/actions/admin/infrastructure/product.repo.prisma";
import type { FormState } from "@/common/admin/form-state";
import {
  C_ImageFilesDTOSchema,
  C_UpsertProductDTOSchema,
  MAX_IMAGES,
  type D_UpsertProductDTO,
} from "@/common/admin/payload/product.dto";
import { requireAdmin } from "@/lib/auth/admin";
import { toBrandSlug as slugify } from "@/lib/catalog";
import { uploadImage } from "@/lib/storage";

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
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const values = Object.fromEntries(
    Object.entries(raw).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const invalid = (fieldErrors: Record<string, string[] | undefined>): FormState => ({
    success: false,
    message: "Check the highlighted fields",
    fieldErrors,
    values,
  });

  const parsed = C_UpsertProductDTOSchema.safeParse(raw);
  if (!parsed.success) return invalid(z.flattenError(parsed.error).fieldErrors);

  // An empty file input still submits one zero-byte File.
  const picked = formData
    .getAll("imageFiles")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const files = C_ImageFilesDTOSchema.safeParse(picked);
  if (!files.success) return invalid({ imageFiles: [files.error.issues[0].message] });
  if (parsed.data.images.length + files.data.length > MAX_IMAGES) {
    return invalid({ imageFiles: [`Up to ${MAX_IMAGES} images in total`] });
  }

  // Upload only after every field is valid, so a rejected form leaves no stray objects.
  let uploaded: string[];
  try {
    uploaded = await Promise.all(files.data.map((file) => uploadImage(file, "products")));
  } catch (error) {
    console.error("Image upload failed", error);
    return { success: false, message: "Photo upload failed. Try again", values };
  }
  const data = { ...parsed.data, images: [...parsed.data.images, ...uploaded] };

  const generated = data.slug === null;
  const baseSlug = data.slug ?? slugify(data.title);
  let result = await save(id, { ...data, slug: baseSlug });

  // A generated slug can clash with a similar listing; retry once with a short suffix.
  if (!result.success && generated && result.message === SLUG_TAKEN) {
    const suffix = randomBytes(2).toString("hex");
    result = await save(id, { ...data, slug: `${baseSlug}-${suffix}` });
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
