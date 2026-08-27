import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "../types/product";
import { getProducts } from "../services/productService";
import ProductSkeleton from "../components/ProductSkeleton";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data.slice(0, 3));
      } catch {
        setError("Unable to load fragrances.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="bg-stone-50 text-stone-900">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">

          {/* Hero Content */}
          <div className="max-w-xl">

            <p className="text-sm font-medium uppercase tracking-[0.35em] text-stone-500">
              The Art of Fragrance
            </p>

            <h1 className="mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your signature
              <span className="block font-semibold">
                has a scent.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-stone-600 sm:text-lg">
              Discover refined fragrances created for moments,
              moods, and personalities. Find the scent that feels
              unmistakably yours.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-700"
              >
                Shop Collection
              </Link>

              <a
                href="#featured"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-medium text-stone-800 transition duration-300 hover:border-stone-500"
              >
                Explore
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute h-72 w-72 rounded-full bg-stone-200 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative flex h-120 w-full max-w-md items-center justify-center overflow-hidden rounded-4xl bg-stone-200 sm:h-150">

              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85"
                alt="Luxury perfume bottle"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Scentora
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Introduction */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">

          <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
            More than a fragrance
          </p>

          <h2 className="mt-5 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A scent can become
            <span className="font-semibold"> a memory.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-500">
            At Scentora, we believe fragrance is more than something
            you wear. It is an expression of who you are, where you've
            been, and the moments you want to remember.
          </p>

        </div>
      </section>

      {/* Featured Section */}
      <section
        id="featured"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
              Discover
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The Scentora Collection
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-medium text-stone-600 underline underline-offset-4 transition hover:text-stone-900"
          >
            View all fragrances →
          </Link>

        </div>

        {/* Placeholder featured cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}

          {error && (
            <div className="col-span-full rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
              <h3 className="text-xl font-semibold text-stone-900">
                Something went wrong.
              </h3>

              <p className="mt-2 text-sm text-stone-500">
                We couldn't load our fragrances right now.
                Please try again later.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-4/5 overflow-hidden bg-stone-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-stone-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                    Fragrance
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-stone-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                    {product.description}
                  </p>

                  <p className="mt-4 font-medium text-stone-900">
                    BDT{Number(product.price).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}

          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                <h3 className="text-xl font-semibold text-stone-900">
                  Our collection is coming soon.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                  We're carefully preparing our fragrance collection.
                  Check back soon to discover something special.
                </p>
              </div>
            )}

        </div>
      </section>

      {/* Features */}
      <section className="bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
              The Scentora Promise
            </p>

            <h2 className="mt-4 text-3xl font-light sm:text-4xl">
              Made for the way you live.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-stone-700">
                01
              </div>

              <h3 className="mt-5 font-semibold">
                Authentic Fragrances
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-400">
                Carefully sourced products selected with quality in mind.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-stone-700">
                02
              </div>

              <h3 className="mt-5 font-semibold">
                Curated Selection
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-400">
                Discover fragrances chosen for different moods and personalities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-stone-700">
                03
              </div>

              <h3 className="mt-5 font-semibold">
                Delivered With Care
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-400">
                Your fragrance is packaged carefully and delivered safely.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-100">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-32">

          <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
            Find yours
          </p>

          <h2 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl">
            What will your
            <span className="font-semibold"> scent </span>
            say about you?
          </h2>

          <Link
            to="/products"
            className="mt-9 inline-block rounded-full bg-stone-900 px-8 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-700"
          >
            Explore the Collection
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;