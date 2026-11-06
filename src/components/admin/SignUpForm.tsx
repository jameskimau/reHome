"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUp } from "@/actions/admin/application/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// COMPONENT
const SignUpForm = () => {
  // USE ACTION자체가 서버쪽 State를 실행하는 함수임.
  const [state, formAction, pending] = useActionState(signUp, null);

  if (state?.success) {
    return (
      <div className="space-y-4">
        <p role="status" className="text-sm">
          {state.message}
        </p>
        <Button asChild size="lg" className="w-full">
          <Link href="/admin/sign-in">Go to sign in</Link>
        </Button>
      </div>
    );
  }

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];
  // BUILD UI
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          defaultValue={state?.values?.name}
          aria-invalid={!!fieldError("name")}
          required
        />
        {fieldError("name") && <p className="text-sm text-destructive">{fieldError("name")}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state?.values?.email}
          aria-invalid={!!fieldError("email")}
          required
        />
        {fieldError("email") && <p className="text-sm text-destructive">{fieldError("email")}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          aria-invalid={!!fieldError("password")}
          required
        />
        {fieldError("password") && (
          <p className="text-sm text-destructive">{fieldError("password")}</p>
        )}
      </div>
      {state && !state.success && !state.fieldErrors && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
};

export default SignUpForm;
