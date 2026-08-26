import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1 className="my-3 text-center font-serif font-bold">Our Perfumes</h1>

      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Products;