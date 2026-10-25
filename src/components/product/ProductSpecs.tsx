import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { CATEGORY_META, CONDITION_LABELS, formatCapacity, formatDimensions } from "@/lib/catalog";
import { formatPhone, toTelHref } from "@/lib/format";
import type { ProductDetailResponse } from "@/common/visitors/response/product.response";

interface ProductSpecsProps {
  product: ProductDetailResponse;
}

interface Spec {
  label: string;
  value: ReactNode;
}

function buildSpecs(product: ProductDetailResponse): Spec[] {
  return [
    { label: "Type", value: CATEGORY_META[product.category].label },
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model },
    { label: "Condition", value: CONDITION_LABELS[product.condition] },
    { label: "Capacity", value: formatCapacity(product) },
    { label: "Dimensions (W × H × D)", value: formatDimensions(product) },
    {
      label: "Contact",
      value: (
        <a
          href={toTelHref(siteConfig.phone)}
          className="text-primary underline-offset-4 hover:underline"
        >
          {formatPhone(siteConfig.phone)}
        </a>
      ),
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
