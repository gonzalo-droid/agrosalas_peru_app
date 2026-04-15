"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductText } from "@/i18n/productsI18n";
import type { ProductCategory } from "@/types";

type FilterValue = "all" | ProductCategory;

export function CatalogoClient() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();
  const { t, locale } = useLanguage();

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
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      if (!matchCat) return false;
      if (q === "") return true;
      const text = getProductText(p, locale);
      return (
        text.name.toLowerCase().includes(q) ||
        text.shortDescription.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, search, locale]);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-section">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ value }) => {
              const labelKey = value === "all" ? "category.all" : `category.${value}`;
              return (
                <button
                  key={value}
                  onClick={() => handleCategory(value as FilterValue)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeCategory === value
                      ? "bg-brand-600 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-brand-400 hover:text-brand-700"
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder={t("catalog.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full sm:w-64 transition"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length}{" "}
          {filtered.length === 1
            ? t("catalog.foundSingular")
            : t("catalog.foundPlural")}
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
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {t("catalog.emptyTitle")}
            </h3>
            <p className="text-gray-400">{t("catalog.emptyDesc")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
