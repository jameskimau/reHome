import WebsitePriceInfo from "@/components/product/WebsitePriceInfo";
import { WEBSITE_PRICE_QUESTION } from "@/components/product/website-price";
import { getDiscount } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceBoxProps {
  price: number;
  compareAtPrice: number | null;
  className?: string;
}

// Deal-style price block: struck-through original on a tab, the price on orange, savings on amber,
// and a "Save %" ribbon across the top-right corner. Without a discount it's just the orange panel.
const PriceBox = ({ price, compareAtPrice, className }: PriceBoxProps) => {
  const savings = getDiscount({ price, compareAtPrice });

  return (
    <div className={cn("space-y-3", savings && "pt-4", className)}>
      <div className="relative w-full max-w-60 border-2 border-foreground">
        {savings && compareAtPrice !== null && (
          <p className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-foreground px-3 py-1 text-sm font-bold text-background tabular-nums">
            <span className="sr-only">Was </span>
            <s className="decoration-cta decoration-2">{formatPrice(compareAtPrice)}</s>
          </p>
        )}

        {/* Clips the corner ribbon without clipping the "was" tab above. */}
        <div className="relative overflow-hidden">
          {savings && (
            <p className="absolute top-4 -right-9 w-32 rotate-45 bg-foreground py-1 text-center text-xs font-bold text-background shadow-sm">
              Save {savings.percent}%
            </p>
          )}

          <p
            className={cn(
              "bg-cta px-4 text-center text-2xl font-extrabold tracking-tight text-cta-foreground tabular-nums",
              savings ? "pt-5 pb-2" : "py-2",
            )}
          >
            {savings && <span className="sr-only">Now </span>}
            {formatPrice(price)}
          </p>

          {savings && (
            <p className="bg-amber-400 px-4 py-2 text-center text-base font-extrabold tracking-tight text-amber-950 tabular-nums">
              {formatPrice(savings.amount)} OFF
            </p>
          )}
        </div>
      </div>

      {savings && (
        <WebsitePriceInfo iconFirst side="bottom" className="gap-2 text-sm font-semibold [&>svg]:text-cta">
          {WEBSITE_PRICE_QUESTION}
        </WebsitePriceInfo>
      )}
    </div>
  );
};

export default PriceBox;
