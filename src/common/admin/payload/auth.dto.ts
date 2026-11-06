import { z } from "zod";

// ------------------------------------------------------------------------------------------------
// PAYLOAD - SCHEMAS
// ------------------------------------------------------------------------------------------------
export const C_SignInDTOSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1),
});

export const C_SignUpDTOSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  password: z.string().min(8, "At least 8 characters").max(128),
});

// ------------------------------------------------------------------------------------------------
// INFER - DTO TYPES
// ------------------------------------------------------------------------------------------------
export type C_SignInDTO = z.infer<typeof C_SignInDTOSchema>;
export type C_SignUpDTO = z.infer<typeof C_SignUpDTOSchema>;
