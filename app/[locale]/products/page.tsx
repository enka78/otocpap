"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Grid2X2, Grid3X3, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { ProductSkeleton } from "@/components/product-skeleton";
import { products } from "@/data/products";

type ViewMode = "grid-4" | "grid-3" | "list";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid-3");
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const activeBrands = React.useMemo(() => {
    const brands = searchParams.get("brands");
    return brands ? brands.split(",") : [];
  }, [searchParams]);

  const activeCategories = React.useMemo(() => {
    const categories = searchParams.get("categories");
    return categories ? categories.split(",") : [];
  }, [searchParams]);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesBrand =
        activeBrands.length === 0 ||
        activeBrands.includes(product.brand.toLowerCase());
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.includes(product.category);
      return matchesBrand && matchesCategory;
    });
  }, [activeBrands, activeCategories]);

  return (
    <div className="container px-4 py-8">
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <ProductFilters
          activeBrands={activeBrands}
          activeCategories={activeCategories}
        />
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Ürünler</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredProducts.length} ürün bulundu
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={viewMode === "grid-4" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid-4")}
                className="hidden lg:inline-flex"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid-3" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid-3")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-4 md:gap-6 ${
              viewMode === "grid-4"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                : viewMode === "grid-3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {isLoading
              ? // Loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductSkeleton
                    key={index}
                    view={
                      isMobile ? "list" : viewMode === "list" ? "list" : "grid"
                    }
                  />
                ))
              : // Loaded state
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    listView={viewMode === "list"}
                    showPrice={false}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
