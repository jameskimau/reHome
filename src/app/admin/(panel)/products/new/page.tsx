import type { Metadata } from "next";

import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
  // TODO(neon-auth): require an admin session.

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">New product</h1>
      <ProductForm />
    </div>
  );
}
