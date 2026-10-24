const SKELETON_CARD_COUNT = 6;

const ProductListingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Loading products">
      <div className="space-y-3">
        <div className="h-8 w-56 rounded-md bg-muted" />
        <div className="h-4 w-32 rounded-md bg-muted" />
      </div>
      <div className="h-9 w-full max-w-md rounded-full bg-muted" />
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
  );
};

export default ProductListingSkeleton;
