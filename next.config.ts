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
      // La ruta raíz va aparte: con `:path*` vacío Vercel genera "/products/"
      // y agrega un segundo redirect para quitar la barra final.
      ...renamed.flatMap(([from, to]) =>
        [
          [`/${from}`, `/${to}`],
          [`/es/${from}`, `/${to}`],
          [`/en/${from}`, `/en/${to}`],
        ].flatMap(([src, dest]) => [
          { source: src, destination: dest, permanent: true },
          { source: `${src}/:path+`, destination: `${dest}/:path+`, permanent: true },
        ]),
      ),
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
