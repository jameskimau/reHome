import type { Metadata } from "next";

import SignInForm from "@/components/admin/SignInForm";
import Logo from "@/components/layout/Logo";

export const metadata: Metadata = { title: "관리자 로그인" };

// Static: no session read here. Only users given the admin role in the Neon Console
// (Auth → Users) get past requireAdmin().
export default function AdminSignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-3">
          <Logo />
          <h1 className="text-xl font-bold">관리자 로그인</h1>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
