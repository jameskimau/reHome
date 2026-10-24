"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import FilterCheckboxItem from "@/components/product/filters/FilterCheckboxItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EMPTY_QUERY,
  buildShopHref,
  countActiveFilters,
  toggleValue,
  type FilterKey,
  type ProductQuery,
} from "@/lib/product-query";
import type { ProductFacets } from "@/lib/products";
import { cn } from "@/lib/utils";

const SECTIONS: { key: FilterKey; title: string }[] = [
  { key: "categories", title: "Category" },
  { key: "brands", title: "Brand" },
  { key: "priceRanges", title: "Price" },
];

interface FilterPanelProps {
  query: ProductQuery;
  facets: ProductFacets;
}

const FilterPanel = ({ query, facets }: FilterPanelProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (nextQuery: ProductQuery) => {
    startTransition(() => router.push(buildShopHref(nextQuery), { scroll: false }));
  };

  const toggle = (key: FilterKey, value: string) => {
    navigate({ ...query, [key]: toggleValue(query[key], value) });
  };

  const clearAll = () => navigate({ ...EMPTY_QUERY, sort: query.sort });

  return (
    <div className={cn("space-y-2 transition-opacity", isPending && "opacity-60")}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {countActiveFilters(query) > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={SECTIONS.map((section) => section.key)}>
        {SECTIONS.map(({ key, title }) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              {title}
            </AccordionTrigger>
            <AccordionContent>
              {facets[key].map((option) => (
                <FilterCheckboxItem
                  key={option.value}
                  option={option}
                  checked={query[key].includes(option.value)}
                  onToggle={() => toggle(key, option.value)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterPanel;
