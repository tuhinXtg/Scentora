import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>BDT{product.price}</p>

      <p>Stock: {product.stock}</p>
    </article>
  );
}

export default ProductCard;