import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lemonsqueezy.com",
      },
    ],
  },
};

export default nextConfig;
