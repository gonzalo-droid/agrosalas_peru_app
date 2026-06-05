"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductText } from "@/i18n/productsI18n";

const PLACEHOLDER = "/images/products/placeholder.svg";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { t, locale } = useLanguage();
  const image = product.image?.trim() ? product.image : PLACEHOLDER;
  const text = getProductText(product, locale);

  return (
    <Link
      href={`/catalogo/${product.id}`}
      className="card group flex flex-col focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      {/* Image */}
      <div className="relative h-60 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
        <Image
          src={image}
          alt={text.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 badge badge-${product.category}`}
        >
          {t(`category.${product.category}`)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {text.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
          {text.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{text.unit}</span>
          <span
            className={`text-xs font-semibold ${
              product.available ? "text-brand-600" : "text-gray-400"
            }`}
          >
            {product.available ? t("product.available") : t("product.unavailable")}
          </span>
        </div>
      </div>
    </Link>
  );
}
