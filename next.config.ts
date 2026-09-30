import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La imagen OG por defecto pasó de /opengraph-image a /og (por idioma).
  async redirects() {
    return [{ source: "/opengraph-image", destination: "/og", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
