"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products, brands, categories } from "@/data/products";

export default function FilteredProductsPage() {
  const params = useParams();
  const filters = params.filters as string[];

  const filteredProducts = products.filter((product) => {
    return filters.every((filter) => {
      const [type, value] = filter.split("-");

      switch (type) {
        case "category":
          return categories.some(
            (c) => c.id === value && product.category === value
          );
        case "brand":
          return brands.some(
            (b) => b.id === value && product.brand.toLowerCase() === value
          );
        default:
          return true;
      }
    });
  });

  return (
    <div className="container px-4 py-8">
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} view="grid" />
        ))}
      </div>
    </div>
  );
}
