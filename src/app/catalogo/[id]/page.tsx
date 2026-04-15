import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileText, Package } from "lucide-react";
import { products } from "@/data/products";

const PLACEHOLDER = "/images/products/placeholder.svg";

const CATEGORY_LABELS: Record<string, string> = {
  enlatados:  "Enlatados",
  conservas:  "Conservas",
  congelados: "Congelados",
};

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

  const image = product.image?.trim() ? product.image : PLACEHOLDER;

  const quoteSubject = "Solicitud de cotización";
  const quoteMessage = `Hola, quisiera solicitar una cotización del producto "${product.name}" (${product.unit}).`;
  const contactHref =
    `/contact?asunto=${encodeURIComponent(quoteSubject)}` +
    `&producto=${encodeURIComponent(product.name)}` +
    `&mensaje=${encodeURIComponent(quoteMessage)}`;

  const whatsappHref =
    `https://wa.me/905600449?text=${encodeURIComponent(
      `Hola, me interesa cotizar el producto: ${product.name} (${product.unit}).`,
    )}`;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-12">
        <div className="container-section">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-brand-100 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
          <span className={`badge badge-${product.category} mb-3`}>
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {product.name}
          </h1>
        </div>
      </div>

      {/* Detail */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="card p-0">
              <div className="relative aspect-square bg-gradient-to-br from-brand-50 to-brand-100">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <span
                  className={`absolute top-4 left-4 badge badge-${product.category}`}
                >
                  {CATEGORY_LABELS[product.category]}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Meta cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-11 h-11 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">
                      Presentación
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div
                    className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                      product.available
                        ? "bg-brand-100 text-brand-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">
                      Disponibilidad
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.available ? "Disponible" : "Sin stock"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Long description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-brand-600" />
                  <h2 className="text-base font-bold text-gray-900">
                    Descripción del producto
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link href={contactHref} className="btn-primary flex-1 justify-center">
                  Solicitar cotización
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 justify-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
                Productos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => {
                  const relImage = p.image?.trim() ? p.image : PLACEHOLDER;
                  return (
                    <Link
                      key={p.id}
                      href={`/catalogo/${p.id}`}
                      className="card group flex flex-col"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
                        <Image
                          src={relImage}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-700 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">{p.unit}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
