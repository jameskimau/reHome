"use client";

import { useState, useTransition } from "react";

import { updateProductStatus } from "@/actions/admin/application/update-product-status";
import { STATUS_LABELS } from "@/components/admin/labels";
import type { ProductStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ProductStatus, string> = {
  AVAILABLE: "border-success/40 text-success",
  RESERVED: "border-amber-500/50 text-amber-700",
  SOLD: "border-border text-muted-foreground",
};

interface StatusSelectProps {
  id: string;
  status: ProductStatus;
}

// Changes status straight from the table; the server refreshes the shop cache.
const StatusSelect = ({ id, status }: StatusSelectProps) => {
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleChange = (next: ProductStatus) => {
    const previous = value;
    setValue(next);
    setError(null);
    startTransition(async () => {
      const result = await updateProductStatus({ id, status: next });
      if (!result.success) {
        setValue(previous);
        setError(result.message);
      }
    });
  };

  return (
    <div>
      <select
        aria-label="Status"
        value={value}
        disabled={pending}
        onChange={(event) => handleChange(event.target.value as ProductStatus)}
        className={cn(
          "h-8 rounded-md border bg-background px-2 text-sm font-medium disabled:opacity-60",
          STATUS_STYLES[value],
        )}
      >
        {Object.entries(STATUS_LABELS).map(([option, label]) => (
          <option key={option} value={option}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default StatusSelect;
