import { PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import StatusSelect from "@/components/admin/StatusSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminProductListResponse } from "@/common/admin/response/product.response";
import { CATEGORY_META } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

const dateFormat = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" });

interface AdminProductTableProps {
  products: AdminProductListResponse[];
}

const AdminProductTable = ({ products }: AdminProductTableProps) => {
  if (products.length === 0) {
    return <p className="rounded-xl border bg-card p-8 text-center">No products yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-card [&_td]:px-4 [&_td]:py-3 [&_th]:px-4">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-16" />
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={product.images[0] ?? CATEGORY_META[product.category].image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="max-w-64">
                <div className="flex items-center gap-2">
                  <p className="min-w-0 truncate font-medium">{product.title}</p>
                  {product.isSpecial && (
                    <Badge className="h-5 shrink-0 bg-cta px-1.5 text-[11px] text-cta-foreground">
                      Special
                    </Badge>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {product.brand} · {CATEGORY_META[product.category].label}
                </p>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="font-medium">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="ml-2 text-xs text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <StatusSelect id={product.id} status={product.status} />
              </TableCell>
              <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                {product.note ?? "—"}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                {dateFormat.format(product.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <PencilIcon aria-hidden="true" />
                    Edit
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductTable;
