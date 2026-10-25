import { z } from "zod";

// ------------------------------------------------------------------------------------------------
// PAYLOAD - SCHEMAS
// C_ = what the client sends, D_ = what the repo receives after validation.
// ------------------------------------------------------------------------------------------------
export const C_FetchProductDetailsDTOSchema = z.object({
  slug: z.string().trim().min(1),
});

// Same shape as C_ for now; diverges once server-derived fields are added.
export const D_FetchProductDetailsDTOSchema = C_FetchProductDetailsDTOSchema;

// ------------------------------------------------------------------------------------------------
// INFER - DTO TYPES
// ------------------------------------------------------------------------------------------------
export type C_FetchProductDetailsDTO = z.infer<typeof C_FetchProductDetailsDTOSchema>;
export type D_FetchProductDetailsDTO = z.infer<typeof D_FetchProductDetailsDTOSchema>;
export type C_FetchProductDetailsDTO_Input = z.input<typeof C_FetchProductDetailsDTOSchema>;
