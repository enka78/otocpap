"use client";

import React, { use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/components/product-filters";
import { ProductCard } from "@/components/product-card";
import { ProductSkeleton } from "@/components/product-skeleton";
import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

// Örnek ürün verisi
const products = [
  {
    id: "1",
    title: "Philips DreamStation CPAP",
    description: "Auto CPAP cihazı, konforlu uyku için gelişmiş teknoloji",
    price: 15000,
    image: "https://placehold.co/600x400",
    category: "cpap",
    brand: "philips",
  },
  {
    id: "2",
    title: "ResMed AirSense 11",
    description: "Akıllı algoritma ile uyku takibi yapan CPAP cihazı",
    price: 18000,
    image: "https://placehold.co/600x400",
    category: "cpap",
    brand: "resmed",
  },
  {
    id: "3",
    title: "F&P Vitera Maske",
    description: "Tam yüz maskesi, her yüz tipine uygun tasarım",
    price: 3000,
    image: "https://placehold.co/600x400",
    category: "masks",
    brand: "fisher",
  },
  {
    id: "4",
    title: "Philips DreamWear Maske",
    description: "Minimal temas ile maksimum konfor sağlayan nazal maske",
    price: 2500,
    image: "https://placehold.co/600x400",
    category: "masks",
    brand: "philips",
  },
  {
    id: "5",
    title: "ResMed AirFit P10",
    description: "Ultra hafif ve sessiz nazal yastık maskesi",
    price: 2000,
    image: "https://placehold.co/600x400",
    category: "masks",
    brand: "resmed",
  },
  {
    id: "6",
    title: "Philips DreamStation Nemlendirici",
    description: "Isıtmalı nemlendirici ünitesi",
    price: 3500,
    image: "https://placehold.co/600x400",
    category: "accessories",
    brand: "philips",
  },
  {
    id: "7",
    title: "Inogen One G5 Oksijen Konsantratörü",
    description:
      "Taşınabilir oksijen konsantratörü, 6 akış ayarı, 13 saate kadar pil ömrü",
    price: 85000,
    image: "https://placehold.co/600x400",
    category: "oksijen-konsantratoru",
    brand: "inogen",
  },
  {
    id: "8",
    title: "DeVilbiss 5L Oksijen Konsantratörü",
    description:
      "Ev tipi oksijen konsantratörü, 5 litre/dakika akış hızı, sessiz çalışma",
    price: 45000,
    image: "https://placehold.co/600x400",
    category: "oksijen-konsantratoru",
    brand: "devilbiss",
  },
];

type ViewMode = "grid-4" | "grid-3" | "list";
type SortOption = "featured" | "price-asc" | "price-desc";

export default function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid-3");
  const [sortOption, setSortOption] = React.useState<SortOption>("featured");
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

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

  // Kullanıcı giriş yapmamışsa içeriği gösterme
  if (!isAuthenticated) {
    return null;
  }

  const categories = searchParams.get("categories")?.split(",") || [];
  const brands = searchParams.get("brands")?.split(",") || [];

  const filteredProducts = products.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }
    if (brands.length > 0 && !brands.includes(product.brand)) {
      return false;
    }
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleLogin = () => {
    dispatch(
      login({
        id: "1",
        name: "Test User",
        email: "test@example.com",
      })
    );
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <ProductFilters
              activeBrands={brands}
              activeCategories={categories}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {categories.length > 0
                  ? t(`categories.${categories[0]}`)
                  : t("products.featured")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {sortedProducts.length} ürün bulundu
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("products.sortBy.featured")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">
                    {t("products.sortBy.featured")}
                  </SelectItem>
                  <SelectItem value="price-asc">
                    {t("products.sortBy.priceAsc")}
                  </SelectItem>
                  <SelectItem value="price-desc">
                    {t("products.sortBy.priceDesc")}
                  </SelectItem>
                </SelectContent>
              </Select>
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
                  <List className="h-4 w-4" />
                </Button>
              </div>
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
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ProductSkeleton
                    key={index}
                    view={
                      isMobile ? "list" : viewMode === "list" ? "list" : "grid"
                    }
                  />
                ))
              : sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    listView={viewMode === "list"}
                    showPrice={true}
                  />
                ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Bu kriterlere uygun ürün bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
