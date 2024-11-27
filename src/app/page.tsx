"use";
import { fetchProducts } from "./utils/service";
import CardProduct from "./component/cardProduct";

export interface Product {
  id: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    price_formatted: string;
    buy_now_url: string;
    thumb_url: string;
  };
}
export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-wrap justify-center h-screen items-center">
      {products.map((cardProduct: Product) => (
        <CardProduct key={cardProduct.id} product={cardProduct} />
      ))}
    </div>
  );
}
