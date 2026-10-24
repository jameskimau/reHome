const SKELETON_CARD_COUNT = 6;
const SKELETON_FILTER_ROWS = 4;

const ProductListingSkeleton = () => {
  return (
    <div
      className="grid animate-pulse gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="hidden space-y-4 rounded-xl border p-5 md:block">
        <div className="h-6 w-20 rounded bg-muted" />
        {Array.from({ length: SKELETON_FILTER_ROWS }, (_, index) => (
          <div key={index} className="h-4 w-full rounded bg-muted" />
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between gap-4">
          <div className="h-8 w-64 rounded-md bg-muted" />
          <div className="h-9 w-44 rounded-md bg-muted" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            <div key={index} className="rounded-xl border">
              <div className="aspect-square rounded-t-xl bg-muted" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-6 w-16 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingSkeleton;
