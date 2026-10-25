import Image from "next/image";
import Link from "next/link";

import PriceTag from "@/components/product/PriceTag";
import SoldOverlay from "@/components/product/SoldOverlay";
import { CATEGORY_META, formatCapacity } from "@/lib/catalog";
import { isSold } from "@/lib/product-filter";
import type { R_ProductDTO } from "@/common/visitors/response/product.dto";

interface ProductCardProps {
  product: R_ProductDTO;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const capacity = formatCapacity(product);
  const sold = isSold(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] ?? CATEGORY_META[product.category].image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
        {/* Corner ribbon; mirrors the "Save %" ribbon on the detail page's PriceBox. */}
        {!sold && product.isSpecial && (
          <span className="absolute top-4 -left-9 w-32 -rotate-45 bg-cta py-1 text-center text-xs font-bold tracking-wide text-cta-foreground uppercase shadow-sm">
            Special
          </span>
        )}
        {sold && <SoldOverlay />}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {product.brand}
          {capacity && ` · ${capacity}`}
        </p>
        {/* Reserve two lines so cards stay the same height whether the title wraps or not. */}
        <h3 className="line-clamp-2 min-h-[2lh] leading-snug font-semibold">{product.title}</h3>
        <div className="mt-auto pt-2">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
