import type { ProductStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";

const STATUS_META: Record<ProductStatus, { label: string; dot: string; text: string }> = {
  AVAILABLE: { label: "In stock", dot: "bg-success", text: "text-success" },
  RESERVED: { label: "Reserved — call to check", dot: "bg-amber-500", text: "text-amber-700" },
  SOLD: { label: "Sold", dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

interface StockStatusProps {
  status: ProductStatus;
  className?: string;
}

const StockStatus = ({ status, className }: StockStatusProps) => {
  const meta = STATUS_META[status];

  return (
    <p className={cn("flex items-center gap-2 font-medium", meta.text, className)}>
      <span className="relative flex size-2.5" aria-hidden="true">
        {status === "AVAILABLE" && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              meta.dot,
            )}
          />
        )}
        <span className={cn("relative inline-flex size-2.5 rounded-full", meta.dot)} />
      </span>
      {meta.label}
    </p>
  );
};

export default StockStatus;
