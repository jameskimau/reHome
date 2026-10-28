"use server";

import { redirect } from "next/navigation";

import type { FormState } from "@/common/admin/form-state";
import { C_SignInDTOSchema } from "@/common/admin/payload/auth.dto";
import { getAuth } from "@/lib/auth/server";

const INVALID = "Invalid email or password";

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = C_SignInDTOSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { success: false, message: INVALID };

  const auth = getAuth();
  const { data, error } = await auth.signIn.email(parsed.data);
  if (error) return { success: false, message: INVALID };

  // A valid account without the admin role must not keep a session here.
  if (data?.user?.role !== "admin") {
    await auth.signOut();
    return { success: false, message: "This account is not an admin" };
  }

  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await getAuth().signOut();
  redirect("/admin/sign-in");
}
