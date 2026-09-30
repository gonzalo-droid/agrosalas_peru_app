import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://agrosalasperu.com";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: "Producto no encontrado" };

  const ogImage = product.image
    ? [{ url: product.image, width: 800, height: 800, alt: product.name }]
    : [{ url: "/og", width: 1200, height: 630, alt: "Agrosalas Peru" }];

  return {
    title: `${product.name} — Agrosalas Peru`,
    description: product.shortDescription,
    alternates: {
      canonical: `${BASE_URL}/catalogo/${product.id}`,
    },
    openGraph: {
      title: `${product.name} — Agrosalas Peru`,
      description: product.shortDescription,
      url: `${BASE_URL}/catalogo/${product.id}`,
      siteName: "Agrosalas Peru",
      type: "website",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Agrosalas Peru`,
      description: product.shortDescription,
      images: product.image ? [product.image] : ["/og"],
    },
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image && { image: `${BASE_URL}${product.image}` }),
    brand: {
      "@type": "Brand",
      name: "Agrosalas Peru",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceRange: "A consultar",
      seller: {
        "@type": "Organization",
        name: "Agrosalas Peru",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${BASE_URL}/catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/catalogo/${product.id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
