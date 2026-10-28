import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import { getAuth } from "@/lib/auth/server";

/** Anyone can create a Neon Auth account, so a session alone is not enough: the user needs the admin role. */
export async function isAdmin(): Promise<boolean> {
  // Sessions are per request; stop prerendering here so builds never need the auth env vars.
  await connection();
  const { data: session } = await getAuth().getSession();
  return session?.user?.role === "admin";
}

/**
 * Data Access Layer guard. Call first in every admin page and admin Server Action:
 * proxy.ts only does an optimistic redirect, and Server Actions can be POSTed directly.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/sign-in");
}
