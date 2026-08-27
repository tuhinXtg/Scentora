import type { Product } from "../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm">
              Out of stock
            </span>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm">
              Only {product.stock} left
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Fragrance
        </p>

        <Link to={`/products/${product.id}`}>
          <h2 className="mt-2 text-xl font-semibold text-gray-900 transition group-hover:text-gray-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description || "No description available."}
        </p>

        {/* Price & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            BDT {Number(product.price).toLocaleString()}
          </p>

          <p className="text-sm text-gray-500">
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        </div>

        {/* Button */}
        <Link
          to={`/products/${product.id}`}
          className="mt-5 block w-full rounded-xl bg-gray-900 px-4 py-3 text-center font-medium text-white transition hover:bg-gray-700"
        >
          View Product
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;