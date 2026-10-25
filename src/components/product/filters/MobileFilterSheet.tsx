"use client";

import { SlidersHorizontalIcon } from "lucide-react";

import FilterPanel from "@/components/product/filters/FilterPanel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { countActiveFilters, type ProductQuery } from "@/lib/product-query";
import type { ProductFacets } from "@/lib/product-filter";

interface MobileFilterSheetProps {
  query: ProductQuery;
  facets: ProductFacets;
  resultCount: number;
}

const MobileFilterSheet = ({ query, facets, resultCount }: MobileFilterSheetProps) => {
  const activeCount = countActiveFilters(query);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="md:hidden">
          <SlidersHorizontalIcon aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm">
        <SheetHeader className="sr-only">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Filter appliances by category, brand and price.</SheetDescription>
        </SheetHeader>
        {/* Top padding clears the sheet's absolute close button. */}
        <div className="flex-1 overflow-y-auto px-4 pt-12">
          <FilterPanel query={query} facets={facets} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button size="lg" className="h-11 w-full text-base">
              Show {resultCount} {resultCount === 1 ? "result" : "results"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
