import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La imagen OG por defecto pasó de /opengraph-image a /og (por idioma).
  async redirects() {
    // Rutas renombradas a inglés: los links viejos (ya indexados) siguen funcionando.
    // Los redirects de config corren antes del proxy, así que cubren cada prefijo.
    const renamed = [
      ["catalogo", "products"],
      ["eventos", "events"],
    ];
    return [
      { source: "/opengraph-image", destination: "/og", permanent: true },
      ...renamed.flatMap(([from, to]) => [
        { source: `/${from}/:path*`, destination: `/${to}/:path*`, permanent: true },
        { source: `/es/${from}/:path*`, destination: `/${to}/:path*`, permanent: true },
        { source: `/en/${from}/:path*`, destination: `/en/${to}/:path*`, permanent: true },
      ]),
    ];
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
