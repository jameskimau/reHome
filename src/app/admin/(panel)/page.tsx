import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { fetchAdminProducts } from "@/actions/admin/application/fetch-admin-products";
import AdminProductTable from "@/components/admin/AdminProductTable";
import { Button } from "@/components/ui/button";

export default async function AdminProductsPage() {
  const response = await fetchAdminProducts();
  if (!response.success) throw new Error(response.message);
  const products = response.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Products{" "}
          <span className="text-base font-normal text-muted-foreground">({products.length})</span>
        </h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusIcon aria-hidden="true" />
            New product
          </Link>
        </Button>
      </div>
      <AdminProductTable products={products} />
    </div>
  );
}
