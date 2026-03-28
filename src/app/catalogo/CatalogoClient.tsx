"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import type { ProductCategory } from "@/types";

type FilterValue = "all" | ProductCategory;

export function CatalogoClient() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  const initialCategory = (searchParams.get("categoria") ?? "all") as FilterValue;

  const [activeCategory, setActiveCategory] = useState<FilterValue>(initialCategory);
  const [search, setSearch]                 = useState("");

  const handleCategory = (value: FilterValue) => {
    setActiveCategory(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("categoria");
    } else {
      params.set("categoria", value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-section">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleCategory(value as FilterValue)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === value
                    ? "bg-brand-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full sm:w-64 transition"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Sin resultados</h3>
            <p className="text-gray-400">
              No encontramos productos con esos criterios. Intenta con otra búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
