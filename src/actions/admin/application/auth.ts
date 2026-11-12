"use server";

import { redirect } from "next/navigation";

import type { FormState } from "@/common/admin/form-state";
import { C_SignInDTOSchema } from "@/common/admin/payload/auth.dto";
import { getAuth } from "@/lib/auth/server";

const INVALID = "이메일 또는 비밀번호가 올바르지 않습니다";

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
    return { success: false, message: "관리자 권한이 없는 계정입니다" };
  }
  // SIGN완료하고 ADMIN
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await getAuth().signOut();
  redirect("/admin/sign-in");
}
