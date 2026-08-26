export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  image_url: string | null;
}