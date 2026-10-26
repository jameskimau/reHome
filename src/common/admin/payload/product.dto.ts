import { z } from "zod";

import { Category, Condition, ProductStatus } from "@/generated/prisma/enums";

// Form fields arrive as strings; empty inputs mean "not set".
const emptyToNull = (value: unknown) =>
  value === "" || value === undefined || value === null ? null : value;

const optionalInt = z.preprocess(emptyToNull, z.coerce.number().int().positive().nullable());
const optionalNumber = z.preprocess(emptyToNull, z.coerce.number().positive().nullable());
const optionalText = z.preprocess(emptyToNull, z.string().trim().nullable());

// One image per line. Local paths ("/images/...") or https URLs.
const imageList = z.preprocess(
  (value) =>
    typeof value === "string"
      ? value
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
      : value,
  z
    .array(
      z
        .string()
        .refine(
          (src) => src.startsWith("/") || src.startsWith("https://"),
          "Use a /path or an https:// URL",
        ),
    )
    .max(12, "Up to 12 images"),
);

// ------------------------------------------------------------------------------------------------
// PAYLOAD - SCHEMAS
// C_ = what the admin form sends, D_ = what the repo receives after the application layer
// fills in the slug. (soldAt is set by the repo, which knows the previous status.)
// ------------------------------------------------------------------------------------------------
export const C_UpsertProductDTOSchema = z
  .object({
    title: z.string().trim().min(1, "Required"),
    /** Optional; generated from the title when empty. */
    slug: z.preprocess(
      emptyToNull,
      z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only")
        .nullable(),
    ),
    category: z.enum(Category),
    brand: z.string().trim().min(1, "Required"),
    model: z.string().trim().min(1, "Required"),
    condition: z.enum(Condition),
    status: z.enum(ProductStatus),
    price: z.coerce.number().int("Whole dollars only").positive("Must be more than 0"),
    compareAtPrice: optionalInt,
    // Checkbox: "on" when ticked, missing otherwise.
    isSpecial: z.preprocess((value) => value === "on" || value === true, z.boolean()),
    capacity: optionalNumber,
    widthCm: optionalInt,
    heightCm: optionalInt,
    depthCm: optionalInt,
    energyRating: z.preprocess(emptyToNull, z.coerce.number().min(0).max(10).nullable()),
    warrantyMonths: optionalInt,
    images: imageList,
    description: z.string().trim().min(1, "Required"),
    note: optionalText,
  })
  .refine((data) => data.compareAtPrice === null || data.compareAtPrice > data.price, {
    path: ["compareAtPrice"],
    message: "Must be higher than the selling price",
  });

export const D_UpsertProductDTOSchema = C_UpsertProductDTOSchema.safeExtend({
  slug: z.string(),
});

export const C_ProductIdDTOSchema = z.object({ id: z.string().min(1) });

export const C_UpdateProductStatusDTOSchema = z.object({
  id: z.string().min(1),
  status: z.enum(ProductStatus),
});

// ------------------------------------------------------------------------------------------------
// INFER - DTO TYPES
// ------------------------------------------------------------------------------------------------
export type C_UpsertProductDTO = z.infer<typeof C_UpsertProductDTOSchema>;
export type D_UpsertProductDTO = z.infer<typeof D_UpsertProductDTOSchema>;
export type C_ProductIdDTO = z.infer<typeof C_ProductIdDTOSchema>;
export type C_UpdateProductStatusDTO = z.infer<typeof C_UpdateProductStatusDTOSchema>;
