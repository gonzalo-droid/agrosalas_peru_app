import Image from "next/image";
import type { Product } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  enlatados:  "Enlatados",
  conservas:  "Conservas",
  congelados: "Congelados",
};

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <article className="card group flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
        <Image
          src={`/images/products/placeholder.svg`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 badge badge-${product.category}`}
        >
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{product.unit}</span>
          <span
            className={`text-xs font-semibold ${
              product.available ? "text-brand-600" : "text-gray-400"
            }`}
          >
            {product.available ? "Disponible" : "Sin stock"}
          </span>
        </div>
      </div>
    </article>
  );
}
