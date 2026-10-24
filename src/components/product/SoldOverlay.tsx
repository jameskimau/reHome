// Dims a product image and marks it as sold. Parent must be `relative`.
const SoldOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/60">
      <span className="rounded-md bg-foreground px-4 py-1.5 text-sm font-bold tracking-widest text-background uppercase">
        Sold
      </span>
    </div>
  );
};

export default SoldOverlay;
