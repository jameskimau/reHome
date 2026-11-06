"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { FormState } from "@/common/admin/form-state";
import { C_SignInDTOSchema, C_SignUpDTOSchema } from "@/common/admin/payload/auth.dto";
import { getAuth } from "@/lib/auth/server";

const INVALID = "Invalid email or password";

// CHECK SIGN-IN USE SERVER HOOKS
export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  // STAGE1 -  102 - PARSING USER INPUT
  const parsed = C_SignInDTOSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { success: false, message: INVALID };
  // AUTH FROM NEON AUTH
  const auth = getAuth();
  // STAGE 2 -  102 - LOGIN WITH NEON AUTH
  const { data, error } = await auth.signIn.email(parsed.data);
  if (error) return { success: false, message: INVALID };
  // STAGE 3 -  102 - CHECK IF USER IS ADMIN
  if (data?.user?.role !== "admin") {
    await auth.signOut();
    return { success: false, message: "This account is not an admin" };
  }
  // SIGN완료하고 ADMIN
  redirect("/admin");
}

// TODO(launch): turn off sign-ups once the admin accounts exist (Neon Console → Auth settings).
// New accounts get the "user" role, so they still can't reach /admin until made admin in the Console.
export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = C_SignUpDTOSchema.safeParse(Object.fromEntries(formData));
  // STAGE1 -  102 - PARSING USER INPUT
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the highlighted fields",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
      },
    };
  }
  // STAGE 2 -  102 - SIGN-UP WITH NEON AUTH
  const auth = getAuth();
  const { error } = await auth.signUp.email(parsed.data);
  if (error) {
    return {
      success: false,
      message: error.message ?? "Could not create the account",
      values: { name: parsed.data.name, email: parsed.data.email },
    };
  }

  // Sign-up also signs the new user in; drop that session until they have the admin role.
  await auth.signOut();
  return {
    success: true,
    message: "Account created. Make it an admin in the Neon Console (Auth → Users), then sign in.",
  };
}

export async function signOut(): Promise<void> {
  await getAuth().signOut();
  redirect("/admin/sign-in");
}
