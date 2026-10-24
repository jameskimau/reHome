import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  size?: "md" | "lg";
  className?: string;
}

const PriceTag = ({ price, size = "md", className }: PriceTagProps) => {
  return (
    <p
      className={cn(
        "font-bold tracking-tight tabular-nums",
        size === "lg" ? "text-3xl" : "text-xl",
        className,
      )}
    >
      {formatPrice(price)}
    </p>
  );
};

export default PriceTag;
