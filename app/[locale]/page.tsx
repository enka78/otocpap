"use client";

import React from "react";
import { HeroSlider } from "@/components/hero-slider";
import { ProductSlider } from "@/components/product-slider";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroSlider />
      <section className="py-8 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            {t("products.mostLiked")}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <ProductSlider />
          )}
        </div>
      </section>
      <section className="py-8 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            {t("products.featured")}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <FeaturedProducts />
          )}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
