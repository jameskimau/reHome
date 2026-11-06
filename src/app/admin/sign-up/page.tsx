import type { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/components/admin/SignUpForm";
import Logo from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Admin sign up" };

// Temporary, until the admin accounts exist. New accounts can't reach /admin until they're given
// the admin role in the Neon Console.
// ADMIN SIGN-UP COMPONENT
export default function AdminSignUpPage() {
  // BUILD UI
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-3">
          <Logo />
          <h1 className="text-xl font-bold">Create admin account</h1>
        </div>
        <SignUpForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/admin/sign-in" className="font-medium text-foreground underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
