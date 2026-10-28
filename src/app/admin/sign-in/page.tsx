import type { Metadata } from "next";

import SignInForm from "@/components/admin/SignInForm";
import Logo from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Admin sign in" };

// Static: no session read here. Accounts are created in the Neon Console (Auth → Users), and only
// users given the admin role there can get past requireAdmin().
export default function AdminSignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-3">
          <Logo />
          <h1 className="text-xl font-bold">Admin sign in</h1>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
