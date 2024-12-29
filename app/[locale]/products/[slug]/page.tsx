"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3, List as ListIcon } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, brands, categories } from "@/data/products";

type ViewMode = "grid-4" | "grid-3" | "list";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid-3");
  const [isMobile, setIsMobile] = React.useState(false);
  const slug = params.slug as string;

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Önce tek bir ürün olarak kontrol et
  const singleProduct = products.find((p) => p.id.toString() === slug);

  if (singleProduct) {
    const whatsappNumber = "905532808273";
    const whatsappMessage = encodeURIComponent(
      `Merhaba, ${singleProduct.name} ürünü hakkında bilgi almak istiyorum.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
      <div className="container px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={singleProduct.image}
              alt={singleProduct.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{singleProduct.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <span>{singleProduct.brand}</span>
              <span>•</span>
              <span>{singleProduct.category}</span>
            </div>
            <p className="text-lg mb-8">{singleProduct.description}</p>

            {singleProduct.features && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Özellikler</h2>
                <ul className="list-disc list-inside space-y-2">
                  {singleProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {singleProduct.specifications && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Teknik Özellikler
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(singleProduct.specifications).map(
                    ([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <Button asChild size="lg" className="w-full md:w-auto">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp ile İletişime Geç
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Kategori veya marka filtresi olarak kontrol et
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categories.some(
      (c) => c.id === slug && product.category === c.id
    );
    const matchesBrand = brands.some(
      (b) => b.id === slug && product.brand.toLowerCase() === b.id
    );
    return matchesCategory || matchesBrand;
  });

  const title =
    categories.find((c) => c.id === slug)?.label ||
    brands.find((b) => b.id === slug)?.label ||
    "Ürünler";

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
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
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            view={isMobile ? "list" : viewMode === "list" ? "list" : "grid"}
          />
        ))}
      </div>
    </div>
  );
}
