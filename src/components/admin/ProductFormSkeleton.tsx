// Placeholder for the new/edit product pages while the admin session and product load.
const ProductFormSkeleton = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6" aria-busy="true" aria-label="불러오는 중">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
      <div className="space-y-5 rounded-xl border bg-card p-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
        <div className="h-32 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
};

export default ProductFormSkeleton;
