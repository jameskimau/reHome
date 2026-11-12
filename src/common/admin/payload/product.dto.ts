import { z } from "zod";

import { Category, Condition, ProductStatus } from "@/generated/prisma/enums";

// Form fields arrive as strings; empty inputs mean "not set".
const emptyToNull = (value: unknown) =>
  value === "" || value === undefined || value === null ? null : value;

const optionalInt = z.preprocess(emptyToNull, z.coerce.number().int().positive().nullable());
const optionalNumber = z.preprocess(emptyToNull, z.coerce.number().positive().nullable());
const optionalText = z.preprocess(emptyToNull, z.string().trim().nullable());

export const MAX_IMAGES = 12;
export const MAX_IMAGE_MB = 4;
// Keep under serverActions.bodySizeLimit (9mb) and the proxy's 10MB body buffer.
export const MAX_UPLOAD_MB = 8;

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
          "/경로 또는 https:// 주소를 입력해주세요",
        ),
    )
    .max(MAX_IMAGES, `이미지는 최대 ${MAX_IMAGES}장까지 가능합니다`),
);

// ------------------------------------------------------------------------------------------------
// PAYLOAD - SCHEMAS
// C_ = what the admin form sends, D_ = what the repo receives after the application layer
// fills in the slug. (soldAt is set by the repo, which knows the previous status.)
// ------------------------------------------------------------------------------------------------
export const C_UpsertProductDTOSchema = z
  .object({
    title: z.string().trim().min(1, "필수 항목입니다"),
    /** Optional; generated from the title when empty. */
    slug: z.preprocess(
      emptyToNull,
      z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다")
        .nullable(),
    ),
    category: z.enum(Category),
    brand: z.string().trim().min(1, "필수 항목입니다"),
    model: z.string().trim().min(1, "필수 항목입니다"),
    condition: z.enum(Condition),
    status: z.enum(ProductStatus),
    price: z.coerce.number().int("달러 단위 정수만 입력해주세요").positive("0보다 커야 합니다"),
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
    description: z.string().trim().min(1, "필수 항목입니다"),
    note: optionalText,
  })
  .refine((data) => data.compareAtPrice === null || data.compareAtPrice > data.price, {
    path: ["compareAtPrice"],
    message: "판매가보다 높아야 합니다",
  });

export const D_UpsertProductDTOSchema = C_UpsertProductDTOSchema.safeExtend({
  slug: z.string(),
});

/** New photos picked in the form; uploaded by the application layer, then appended to `images`. */
export const C_ImageFilesDTOSchema = z
  .array(
    z
      .file()
      .mime(
        ["image/jpeg", "image/png", "image/webp", "image/avif"],
        "JPEG, PNG, WebP, AVIF 파일만 가능합니다",
      )
      .max(MAX_IMAGE_MB * 1024 * 1024, `사진 한 장당 ${MAX_IMAGE_MB}MB 이하여야 합니다`),
  )
  .refine(
    (files) => files.reduce((sum, file) => sum + file.size, 0) <= MAX_UPLOAD_MB * 1024 * 1024,
    `저장 1회당 사진은 최대 ${MAX_UPLOAD_MB}MB까지 가능합니다`,
  );

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
