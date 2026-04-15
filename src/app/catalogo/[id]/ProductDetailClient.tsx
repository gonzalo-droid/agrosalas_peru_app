"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Package } from "lucide-react";
import type { Product } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductText } from "@/i18n/productsI18n";

const PLACEHOLDER = "/images/products/placeholder.svg";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: Props) {
  const { t, locale } = useLanguage();
  const text = getProductText(product, locale);
  const image = product.image?.trim() ? product.image : PLACEHOLDER;

  const quoteMessage =
    locale === "en"
      ? `Hello, I'd like to request a quote for the product "${text.name}" (${text.unit}).`
      : `Hola, quisiera solicitar una cotización del producto "${text.name}" (${text.unit}).`;

  const contactHref =
    `/contact?asunto=quote` +
    `&producto=${encodeURIComponent(text.name)}` +
    `&mensaje=${encodeURIComponent(quoteMessage)}`;

  const waText =
    locale === "en"
      ? `Hello, I'm interested in a quote for: ${text.name} (${text.unit}).`
      : `Hola, me interesa cotizar el producto: ${text.name} (${text.unit}).`;

  const whatsappHref = `https://wa.me/905600449?text=${encodeURIComponent(waText)}`;

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
            {t("detail.back")}
          </Link>
          <span className={`badge badge-${product.category} mb-3`}>
            {t(`category.${product.category}`)}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {text.name}
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
                  alt={text.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <span
                  className={`absolute top-4 left-4 badge badge-${product.category}`}
                >
                  {t(`category.${product.category}`)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {text.shortDescription}
              </p>

              {/* Meta cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-11 h-11 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">
                      {t("detail.presentation")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {text.unit}
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
                      {t("detail.availability")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.available
                        ? t("product.available")
                        : t("product.unavailable")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Long description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-brand-600" />
                  <h2 className="text-base font-bold text-gray-900">
                    {t("detail.description")}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {text.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link href={contactHref} className="btn-primary flex-1 justify-center">
                  {t("detail.quoteCta")}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 justify-center"
                >
                  {t("detail.whatsappCta")}
                </a>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
                {t("detail.related")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => {
                  const relText = getProductText(p, locale);
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
                          alt={relText.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-700 transition-colors">
                          {relText.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">{relText.unit}</p>
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
