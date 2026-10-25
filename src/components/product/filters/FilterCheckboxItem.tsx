"use client";

import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { FacetOption } from "@/lib/product-filter";
import { cn } from "@/lib/utils";

interface FilterCheckboxItemProps {
  option: FacetOption;
  checked: boolean;
  onToggle: () => void;
}

const FilterCheckboxItem = ({ option, checked, onToggle }: FilterCheckboxItemProps) => {
  // useId keeps ids unique when the panel renders in both the sidebar and the mobile sheet.
  const id = useId();
  const isDisabled = option.count === 0 && !checked;

  return (
    <div className={cn("flex items-center gap-3 py-1.5", isDisabled && "opacity-50")}>
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} disabled={isDisabled} />
      <label htmlFor={id} className="flex flex-1 cursor-pointer justify-between gap-2 text-sm">
        <span>{option.label}</span>
        <span className="text-muted-foreground tabular-nums">({option.count})</span>
      </label>
    </div>
  );
};

export default FilterCheckboxItem;
