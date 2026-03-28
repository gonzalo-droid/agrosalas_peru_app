import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

const featured = products.filter((p) => p.featured).slice(0, 4);

export function ProductsPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge bg-brand-100 text-brand-700 mb-3">
            Nuestros productos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Lo mejor del campo
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Seleccionamos los ingredientes más frescos para garantizar enlatados y conservas con calidad de exportación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/catalogo" className="btn-primary">
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
