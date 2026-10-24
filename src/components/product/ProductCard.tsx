import Image from "next/image";
import Link from "next/link";

import ConditionBadge from "@/components/product/ConditionBadge";
import PriceTag from "@/components/product/PriceTag";
import SoldOverlay from "@/components/product/SoldOverlay";
import { CATEGORY_META, formatCapacity } from "@/lib/catalog";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const capacity = formatCapacity(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.images[0] ?? CATEGORY_META[product.category].image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
        <ConditionBadge condition={product.condition} className="absolute top-3 left-3" />
        {product.isSold && <SoldOverlay />}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {product.brand}
          {capacity && ` · ${capacity}`}
        </p>
        <h3 className="leading-snug font-semibold">{product.title}</h3>
        <PriceTag price={product.price} className="mt-auto pt-2" />
      </div>
    </Link>
  );
};

export default ProductCard;
