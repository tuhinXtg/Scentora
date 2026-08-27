import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Product } from "../types/product";
import { getProduct } from "../services/productService";

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProduct(Number(productId));
        setProduct(data);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h1>

        <p className="mt-2 text-gray-500">
          We couldn't find the perfume you're looking for.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link
            to="/products"
            className="transition hover:text-gray-900"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product section */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Product image */}
            <div className="flex min-h-112.5 items-center justify-center bg-stone-100 p-8 sm:p-12 lg:min-h-162.5">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-137.5 w-full object-contain transition duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-100 w-full items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

              {/* Category label */}
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                Premium Fragrance
              </p>

              {/* Product name */}
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mt-6 text-base leading-7 text-gray-600">
                {product.description ||
                  "A carefully selected fragrance created for those who appreciate refined scents."}
              </p>

              {/* Price */}
              <div className="mt-8">
                <p className="text-3xl font-semibold text-gray-900">
                  BDT {product.price}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Inclusive of applicable taxes
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-gray-200" />

              {/* Stock */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Availability
                </span>

                {product.stock > 0 ? (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    In Stock
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>

                <div className="mt-2 flex w-32 items-center rounded-xl border border-gray-300">
                  <button
                    type="button"
                    className="flex h-11 w-10 items-center justify-center text-lg text-gray-500 hover:text-gray-900"
                  >
                    −
                  </button>

                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="h-11 w-12 border-x border-gray-300 text-center outline-none"
                  />

                  <button
                    type="button"
                    className="flex h-11 w-10 items-center justify-center text-lg text-gray-500 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                disabled={product.stock === 0}
                className="mt-8 w-full rounded-xl bg-gray-900 px-6 py-4 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {product.stock > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>

              {/* Back */}
              <Link
                to="/products"
                className="mt-4 text-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        {/* Product highlights */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="font-semibold text-gray-900">
              Authentic Products
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Carefully sourced fragrances.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="font-semibold text-gray-900">
              Secure Packaging
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Packed with care before delivery.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="font-semibold text-gray-900">
              Fast Delivery
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Will be delivered safely to your doorstep.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}

export default ProductDetails;