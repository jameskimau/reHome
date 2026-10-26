import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchProductDetails } from "@/actions/visitors/application/fetch-product-details";
import { fetchProducts } from "@/actions/visitors/application/fetch-products";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import DeliveryBadge from "@/components/product/DeliveryBadge";
import PriceBox from "@/components/product/PriceBox";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSpecs from "@/components/product/ProductSpecs";
import SoldOverlay from "@/components/product/SoldOverlay";
import StockStatus from "@/components/product/StockStatus";
import { getCategoryHref } from "@/config/navigation";
import { CATEGORY_META } from "@/lib/catalog";
import { isSold } from "@/lib/product-filter";

export const generateStaticParams = async () => {
  const { data } = await fetchProducts();
  const params = (data ?? []).map((product) => ({ slug: product.slug }));
  // Cache Components rejects an empty list; the placeholder slug simply resolves to notFound().
  return params.length > 0 ? params : [{ slug: "__placeholder__" }];
};

export const generateMetadata = async ({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const { data: product } = await fetchProductDetails({ slug });
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
};

const ProductDetailPage = async ({ params }: PageProps<"/products/[slug]">) => {
  const { slug } = await params;
  const response = await fetchProductDetails({ slug });
  if (!response.success) throw new Error(response.message);

  const product = response.data;
  if (!product) notFound();
  const sold = isSold(product);

  const category = CATEGORY_META[product.category];

  return (
    <Container className="space-y-6 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category.pluralLabel, href: getCategoryHref(category.slug) },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery
          images={product.images.length > 0 ? product.images : [category.image]}
          alt={product.title}
          overlay={sold ? <SoldOverlay /> : undefined}
        />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <StockStatus status={product.status} />
              {!sold && (
                <>
                  <span aria-hidden="true" className="font-bold text-muted-foreground">
                    ·
                  </span>
                  <DeliveryBadge />
                </>
              )}
            </div>
            <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {product.brand} · {product.model}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <PriceBox
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            // Keep the price visible for reference, but don't shout a deal that's gone.
            className={sold ? "opacity-50 grayscale" : undefined}
          />

          {sold ? (
            <div className="space-y-3 rounded-xl bg-muted p-4">
              <p className="font-medium">This item has been sold.</p>
              <p className="text-sm text-muted-foreground">
                Call us and we&apos;ll let you know when a similar one comes in.
              </p>
              <CallButton label="Call us" variant="outline" />
            </div>
          ) : (
            <CallButton
              showNumber
              variant="default"
              className="h-12 w-full px-6 text-base sm:w-auto"
            />
          )}

          <section aria-labelledby="description-heading" className="space-y-2">
            <h2 id="description-heading" className="text-lg font-bold tracking-tight">
              Description
            </h2>
            <p className="leading-relaxed text-foreground/85">{product.description}</p>
          </section>

          <section aria-labelledby="details-heading" className="space-y-3">
            <h2 id="details-heading" className="text-lg font-bold tracking-tight">
              Details
            </h2>
            <ProductSpecs product={product} />
          </section>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
