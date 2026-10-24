import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import FilterPanel from "@/components/product/filters/FilterPanel";
import MobileFilterSheet from "@/components/product/filters/MobileFilterSheet";
import SortSelect from "@/components/product/filters/SortSelect";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { CATEGORY_META, parseCategorySlug } from "@/lib/catalog";
import {
  EMPTY_QUERY,
  buildShopHref,
  parseProductQuery,
  toProductFilter,
  type ProductQuery,
} from "@/lib/product-query";
import { getProductFacets, getProducts } from "@/lib/products";

interface ProductListingProps {
  searchParams: PageProps<"/">["searchParams"];
}

function getListingTitle({ categories }: ProductQuery): string {
  const category = categories.length === 1 ? parseCategorySlug(categories[0]) : undefined;
  return category ? CATEGORY_META[category].pluralLabel : "All appliances";
}

// Reads searchParams, so it must render inside <Suspense> (Cache Components).
const ProductListing = async ({ searchParams }: ProductListingProps) => {
  const query = parseProductQuery(await searchParams);
  const [products, facets] = await Promise.all([
    getProducts(toProductFilter(query)),
    getProductFacets(),
  ]);

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]">
      <aside className="hidden md:block">
        <div className="sticky top-20 rounded-xl border bg-card p-5">
          <FilterPanel query={query} facets={facets} />
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {getListingTitle(query)}{" "}
            <span className="text-base font-normal text-muted-foreground">
              ({products.length} {products.length === 1 ? "result" : "results"})
            </span>
          </h2>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
            <MobileFilterSheet query={query} facets={facets} resultCount={products.length} />
            <SortSelect query={query} />
          </div>
        </div>

        <ProductGrid
          products={products}
          emptyState={
            <EmptyState
              title="No appliances match your filters"
              description="Try removing a filter, or call us — new stock arrives every week."
              action={
                <Button asChild variant="outline">
                  <Link href={buildShopHref({ ...EMPTY_QUERY, sort: query.sort })}>
                    Clear filters
                  </Link>
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
};

export default ProductListing;
