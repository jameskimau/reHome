import { CATEGORY_META, CONDITION_LABELS, formatCapacity, formatDimensions } from "@/lib/catalog";
import type { Product } from "@/types/product";

interface ProductSpecsProps {
  product: Product;
}

interface Spec {
  label: string;
  value: string | undefined;
}

function buildSpecs(product: Product): Spec[] {
  return [
    { label: "Type", value: CATEGORY_META[product.category].label },
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model },
    { label: "Condition", value: CONDITION_LABELS[product.condition] },
    { label: "Capacity", value: formatCapacity(product) },
    { label: "Dimensions (W × H × D)", value: formatDimensions(product) },
    {
      label: "Energy rating",
      value: product.energyRating === undefined ? undefined : `${product.energyRating} stars`,
    },
    {
      label: "Warranty",
      value: product.warrantyMonths === undefined ? undefined : `${product.warrantyMonths} months`,
    },
  ];
}

const ProductSpecs = ({ product }: ProductSpecsProps) => {
  const specs = buildSpecs(product).filter((spec) => spec.value !== undefined);

  return (
    <dl className="divide-y rounded-xl border">
      {specs.map((spec) => (
        <div key={spec.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
          <dt className="text-muted-foreground">{spec.label}</dt>
          <dd className="text-right font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default ProductSpecs;
