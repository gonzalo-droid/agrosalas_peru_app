import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedPath } from "@/i18n/config";
import { getProductText } from "@/i18n/productsI18n";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { BASE_URL } from "@/lib/site";

interface Params {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: translate(locale, "detail.notFound") };

  const text = getProductText(product, locale);

  return pageMetadata({
    locale,
    path: `/catalogo/${product.id}`,
    title: text.name,
    description: text.shortDescription,
    images: product.image
      ? [{ url: product.image, width: 800, height: 800, alt: text.name }]
      : undefined,
  });
}

export default async function ProductDetailPage({ params }: Params) {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const text = getProductText(product, locale);
  const url = (path: string) => absoluteUrl(localizedPath(path, locale));

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: text.name,
    description: text.description,
    url: url(`/catalogo/${product.id}`),
    ...(product.image && { image: `${BASE_URL}${product.image}` }),
    brand: {
      "@type": "Brand",
      name: "Agrosalas Peru",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceRange: translate(locale, "meta.priceRange"),
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
        name: translate(locale, "meta.breadcrumb.home"),
        item: url("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: translate(locale, "meta.breadcrumb.catalog"),
        item: url("/catalogo"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: text.name,
        item: url(`/catalogo/${product.id}`),
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
