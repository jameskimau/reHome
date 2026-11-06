import ProductFormSkeleton from "@/components/admin/ProductFormSkeleton";

// Own boundary: client navigations from /admin share the (panel) layout, so its loading.tsx doesn't show here.
export default function Loading() {
  return <ProductFormSkeleton />;
}
