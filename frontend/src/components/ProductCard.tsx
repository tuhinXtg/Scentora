import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description || "No description available."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            BDT {product.price}
          </p>

          <p className="text-sm text-gray-500">
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

export default ProductCard;