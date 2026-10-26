import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchAdminProductById } from "@/actions/admin/application/fetch-admin-product-by-id";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]/edit">) {
  const { id } = await params;
  const response = await fetchAdminProductById({ id });
  if (!response.success) throw new Error(response.message);

  const product = response.data;
  if (!product) notFound();
  // BUILD UI
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">Edit product</h1>
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          className="text-sm font-medium text-primary hover:underline"
        >
          View on shop
        </Link>
      </div>
      <ProductForm product={product} />
      <section className="space-y-3 rounded-xl border border-destructive/30 bg-card p-5">
        <h2 className="font-semibold">Delete</h2>
        <p className="text-sm text-muted-foreground">
          Removes the listing for good. If it just sold, set the status to Sold instead.
        </p>
        <DeleteProductButton id={product.id} />
      </section>
    </div>
  );
}
