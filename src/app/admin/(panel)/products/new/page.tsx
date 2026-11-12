import type { Metadata } from "next";

import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "새 상품 등록" };

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">새 상품 등록</h1>
      <ProductForm />
    </div>
  );
}
