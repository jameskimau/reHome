import { getDiscount } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  /** Original price; when higher than `price` the tag switches to the sale layout. */
  compareAtPrice?: number | null;
  size?: "md" | "lg";
  className?: string;
}

const PriceTag = ({ price, compareAtPrice = null, size = "md", className }: PriceTagProps) => {
  const discount = getDiscount({ price, compareAtPrice });
  const large = size === "lg";

  if (!discount || compareAtPrice === null) {
    return (
      <p
        className={cn(
          "font-bold tracking-tight tabular-nums",
          large ? "text-3xl" : "text-xl",
          className,
        )}
      >
        {formatPrice(price)}
      </p>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-cta/25 bg-cta/5",
        large ? "space-y-1 p-4" : "space-y-0.5 p-3",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className={cn("text-muted-foreground tabular-nums", large ? "text-base" : "text-sm")}>
          <span className="sr-only">Was </span>
          <s>{formatPrice(compareAtPrice)}</s>
        </p>
        <span className="rounded-md bg-cta px-2 py-0.5 text-xs font-bold tracking-wide text-cta-foreground uppercase">
          {discount.percent}% off
        </span>
      </div>
      <p
        className={cn(
          "font-extrabold tracking-tight text-cta tabular-nums",
          large ? "text-4xl" : "text-2xl",
        )}
      >
        {formatPrice(price)}
      </p>
      <p className={cn("font-semibold", large ? "text-sm" : "text-xs")}>
        You save {formatPrice(discount.amount)}
      </p>
    </div>
  );
};

export default PriceTag;
