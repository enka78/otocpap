"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  listView?: boolean;
  showPrice?: boolean;
}

export function ProductCard({
  product,
  listView = false,
  showPrice = false,
}: ProductCardProps) {
  const t = useTranslations();

  const formattedPrice = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(product.price);

  if (listView) {
    return (
      <div className="flex gap-6 p-4 border rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-muted-foreground mt-2">{product.description}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            {showPrice && (
              <span className="text-2xl font-bold">{formattedPrice}</span>
            )}
            <div className={`flex gap-2 ${!showPrice ? "ml-auto" : ""}`}>
              <Button variant="outline">{t("products.details")}</Button>
              {showPrice && (
                <Button>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("products.addToCart")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border rounded-lg hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold truncate">{product.title}</h2>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 space-y-2">
          {showPrice && (
            <div className="text-xl font-bold">{formattedPrice}</div>
          )}
          <div
            className={`grid ${
              showPrice ? "grid-cols-2" : "grid-cols-1"
            } gap-2`}
          >
            <Button variant="outline" className="w-full">
              {t("products.details")}
            </Button>
            {showPrice && (
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("products.addToCart")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
