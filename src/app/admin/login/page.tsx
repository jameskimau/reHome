import type { Metadata } from "next";

import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/layout/Logo";

export const metadata: Metadata = { title: "Admin login" };

// proxy.ts sends signed-in admins straight to /admin, so this page stays static.
export default function AdminLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-3">
          <Logo />
          <h1 className="text-xl font-bold">Admin sign in</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
