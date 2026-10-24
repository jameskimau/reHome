import CallButton from "@/components/common/CallButton";
import EmptyState from "@/components/common/EmptyState";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import { CATEGORY_META, parseCategorySlug } from "@/lib/catalog";
import { getProducts } from "@/lib/products";

interface ProductListingProps {
  searchParams: PageProps<"/products">["searchParams"];
}

// Reads searchParams, so it must render inside <Suspense> (Cache Components).
const ProductListing = async ({ searchParams }: ProductListingProps) => {
  const { category: categoryParam } = await searchParams;
  const category = parseCategorySlug(typeof categoryParam === "string" ? categoryParam : undefined);
  const products = await getProducts({ category });

  const title = category ? CATEGORY_META[category].pluralLabel : "All Appliances";

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {products.length} {products.length === 1 ? "item" : "items"} available
        </p>
      </div>

      <CategoryFilter active={category} />

      <ProductGrid
        products={products}
        emptyState={
          <EmptyState
            title="Nothing in stock right now"
            description="New appliances come in every week. Give us a call and we'll let you know when one arrives."
            action={<CallButton label="Call us" />}
          />
        }
      />
    </>
  );
};

export default ProductListing;
