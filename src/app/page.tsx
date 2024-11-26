import axios from "axios";
import Image from "next/image";

const lsqyConfig = {
  API_KEY:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIxZmVjNTE3N2Q2NTAxM2M0OGVkZTlmYTYxYjk2NGEzYTViMGIzMWUwYWJmMDM4NDQzNDBmNTgyZGZkOGZlNTFlNGQzYzllYTljNDlhYjlmYyIsImlhdCI6MTczMjYyMTU4OS4wMzI0NTUsIm5iZiI6MTczMjYyMTU4OS4wMzI0NTgsImV4cCI6MjA0ODE1NDM4OC45ODg2NDUsInN1YiI6IjM4NTc4MzUiLCJzY29wZXMiOltdfQ.NfxVo17Jwn93wyFGvjoFs1tNcbqiMv7gmXWcsjTDgzXP6WqeYUIlujzJQXsvAsNMzdt71HTaIWvyO5YMjTB9NMP7AJ_mkgZRr7RQAv52k3lAkWPMqbY2rdyyrOkCjQb5n7Vf4jB4xm7zD5hvIfQu_ZLtZ4NCNY7Sey5FgulwNHjO3NTPwu8myaO-e7G1LFTIc3g1T-VBSY-dewmS4ePD8udPWKglu1TbIM3ze5yrCpIyBbjCfyrwEwxHg5FgQPNYHwmAMF-ZtZotmokdr6S23RezbIvImWs0WEPBSWCE_zLth1rOrXW1WYjxFng0jXhyxEgysYPZDOQhY9TKxcHQmwS4s_p7ExkQAR2OLyYJIiARSbPV3qWYIWb0W26Bx0bFrhFLZGe_JF52UfM8Z5sRWhmGuaUhKNOnanoRZIOJQAY4Fd9Bu2ktBgfF_JinTjFjmRfijEbJb_cEWSPQmaEDXMd5DjF85Dy7cKctZBd9kIeILk4grjaOcWkaBAa9Nkcf",
  URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

async function fetchProducts() {
  try {
    const response = await axios.get(`${lsqyConfig.URL}/products`, { headers });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}
interface Product {
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
      {products.map((product: Product) => (
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
          <p className="text-gray-600 mt-1">{product.attributes.description}</p>
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
        </div>
      ))}
    </div>
  );
}
