"use server";

import { redirect } from "next/navigation";

import type { FormState } from "@/common/admin/form-state";
import { C_SignInDTOSchema } from "@/common/admin/payload/auth.dto";
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

export async function signOut(): Promise<void> {
  await getAuth().signOut();
  redirect("/admin/sign-in");
}
