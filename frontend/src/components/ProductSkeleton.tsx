function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="aspect-4/5 animate-pulse bg-stone-200" />

      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-stone-200" />

        <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />

        <div className="h-4 w-full animate-pulse rounded bg-stone-200" />

        <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />

        <div className="h-5 w-24 animate-pulse rounded bg-stone-200" />
      </div>
    </div>
  );
}

export default ProductSkeleton;