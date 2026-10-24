import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import ConditionBadge from "@/components/product/ConditionBadge";
import PriceTag from "@/components/product/PriceTag";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSpecs from "@/components/product/ProductSpecs";
import SoldOverlay from "@/components/product/SoldOverlay";
import { getCategoryHref } from "@/config/navigation";
import { CATEGORY_META } from "@/lib/catalog";
import { getProductBySlug, getProducts } from "@/lib/products";

export const generateStaticParams = async () => {
  const products = await getProducts({ includeSold: true });
  return products.map((product) => ({ slug: product.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
};

const ProductDetailPage = async ({ params }: PageProps<"/products/[slug]">) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = CATEGORY_META[product.category];

  return (
    <Container className="space-y-6 py-8">
      <Link
        href={getCategoryHref(category.slug)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
        Back to {category.pluralLabel}
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery
          images={product.images.length > 0 ? product.images : [category.image]}
          alt={product.title}
          overlay={product.isSold ? <SoldOverlay /> : undefined}
        />

        <div className="space-y-6">
          <div className="space-y-3">
            <ConditionBadge condition={product.condition} />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.title}</h1>
            <PriceTag price={product.price} size="lg" />
          </div>

          {product.isSold ? (
            <div className="space-y-3 rounded-xl bg-muted p-4">
              <p className="font-medium">This item has been sold.</p>
              <p className="text-sm text-muted-foreground">
                Call us and we&apos;ll let you know when a similar one comes in.
              </p>
              <CallButton label="Call us" variant="outline" />
            </div>
          ) : (
            <CallButton showNumber className="h-12 w-full text-base sm:w-auto sm:px-6" />
          )}

          <p className="leading-relaxed">{product.description}</p>

          <ProductSpecs product={product} />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
