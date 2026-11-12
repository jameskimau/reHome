import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchAdminProductById } from "@/actions/admin/application/fetch-admin-product-by-id";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "상품 수정" };

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
        <h1 className="text-2xl font-bold">상품 수정</h1>
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          className="text-sm font-medium text-primary hover:underline"
        >
          쇼핑몰에서 보기
        </Link>
      </div>
      <ProductForm product={product} />
      <section className="space-y-3 rounded-xl border border-destructive/30 bg-card p-5">
        <h2 className="font-semibold">상품 삭제</h2>
        <p className="text-sm text-muted-foreground">
          상품을 완전히 삭제합니다. 판매된 상품이라면 삭제하지 말고 상태를 “판매완료”로 바꿔주세요.
        </p>
        <DeleteProductButton id={product.id} />
      </section>
    </div>
  );
}
