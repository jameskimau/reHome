import type { ProductDetailResponse } from "@/common/visitors/response/product.response";
import { siteConfig } from "@/config/site";
import type { ProductStatus } from "@/generated/prisma/enums";

const AVAILABILITY: Record<ProductStatus, string> = {
  AVAILABLE: "https://schema.org/InStock",
  RESERVED: "https://schema.org/LimitedAvailability",
  SOLD: "https://schema.org/SoldOut",
};

// Structured data so Google can show price and stock next to the product in search results.
const ProductJsonLd = ({ product }: { product: ProductDetailResponse }) => {
  const url = `${siteConfig.url}/products/${product.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.id,
    mpn: product.model,
    brand: { "@type": "Brand", name: product.brand },
    // Local paths ("/images/...") must be absolute for crawlers.
    image: product.images.map((src) => new URL(src, siteConfig.url).toString()),
    url,
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "AUD",
      availability: AVAILABILITY[product.status],
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
};

export default ProductJsonLd;
