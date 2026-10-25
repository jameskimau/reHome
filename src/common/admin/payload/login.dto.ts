import { z } from "zod";

// ------------------------------------------------------------------------------------------------
// PAYLOAD - SCHEMAS
// ------------------------------------------------------------------------------------------------
export const C_LoginDTOSchema = z.object({
  // Login ID; usually an email, but any string matching ADMIN_EMAIL works.
  email: z.string().trim().toLowerCase().min(1),
  password: z.string().min(1),
});

// ------------------------------------------------------------------------------------------------
// INFER - DTO TYPES
// ------------------------------------------------------------------------------------------------
export type C_LoginDTO = z.infer<typeof C_LoginDTOSchema>;
