import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
        />
      )}

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>৳{product.price}</p>

      <p>Stock: {product.stock}</p>
    </article>
  );
}

export default ProductCard;