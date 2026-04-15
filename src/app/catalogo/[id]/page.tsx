import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

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

  return {
    title: `${product.name} — Agrosalas Peru`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
