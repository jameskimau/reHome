"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_SORT, SORT_OPTIONS } from "@/lib/catalog";
import { buildProductsHref, type ProductQuery } from "@/lib/product-query";

interface SortSelectProps {
  query: ProductQuery;
}

const SortSelect = ({ query }: SortSelectProps) => {
  const router = useRouter();

  const changeSort = (value: string) => {
    const sort = SORT_OPTIONS.find((option) => option.id === value)?.id ?? DEFAULT_SORT;
    router.push(buildProductsHref({ ...query, sort }), { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">Sort by:</span>
      <Select value={query.sort} onValueChange={changeSort}>
        <SelectTrigger className="h-9 min-w-44" aria-label="Sort by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
