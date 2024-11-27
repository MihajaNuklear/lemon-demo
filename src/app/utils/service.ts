import axios from "axios";
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

export async function fetchProducts() {
  try {
    const response = await axios.get(`${lsqyConfig.URL}/products`, { headers });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}

export async function setPrice({
  id,
  newPrice,
}: {
  id: string;
  newPrice: number;
}) {
  const url = `${lsqyConfig.URL}/products/${id}`;
  const payload = {
    data: {
      type: "products",
      id,
      attributes: {
        price: newPrice,
      },
    },
  };

  try {
    // Affiche les détails de la requête
    console.log("Requête envoyée :");
    console.log("URL :", url);
    console.log("Payload :", JSON.stringify(payload, null, 2));
    console.log("Headers :", headers);

    // Envoi de la requête
    const response = await axios.patch(url, payload, { headers });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification du prix :", error);
  }
}

export function removeHtmlTags(text: string): string {
  return text.replace(/<.*?>/g, "");
}
