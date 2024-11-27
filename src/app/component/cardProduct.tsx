"use client";
import { Product } from "../page";
import Image from "next/image";
import { removeHtmlTags, setPrice } from "../utils/service";
import { FormEvent } from "react";

interface CardProductProps {
  product: Product;
}
export default function CardProduct({ product }: CardProductProps) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPrice({ id: product.id, newPrice: product.attributes.price });
    console.log("je sublmit");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        key={product.id}
        className="border border-gray-300 p-4 m-4 rounded-md w-72 shadow-md"
      >
        <div className="border  border-gray-300 rounded-md  ">
          <Image
            src={product.attributes.thumb_url}
            alt={product.attributes.name}
            className="w-full h-auto rounded-md"
            width={500}
            height={500}
          />
        </div>
        <h2 className="text-lg font-semibold mt-2">
          {product.attributes.name}
        </h2>
        <p className="text-gray-600 mt-1">
          {removeHtmlTags(product.attributes.description)}
        </p>
        <p className="text-gray-800 font-bold mt-2">
          Prix: {product.attributes.price_formatted}
        </p>
        <a
          href={product.attributes.buy_now_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 px-4 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Acheter maintenant
        </a>
        <button
          className="w-full mt-2 h-10 bg-yellow-400 rounded-md"
          type="submit"
        >
          Prix + 10 MGA
        </button>
      </div>
    </form>
  );
}
