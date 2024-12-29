"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  product: Product;
  view: "grid" | "list";
}

export function ProductCard({ product, view }: ProductCardProps) {
  const t = useTranslations();
  const whatsappNumber = "905532808273";
  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const isList = view === "list";
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobil için tam ekran detay popup'ı
  const MobileDetailPopup = () => (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDetailOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Ürün Görseli */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-4">
            {/* Marka */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Marka
              </h3>
              <p className="text-base">{product.brand}</p>
            </div>

            {/* Açıklama */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Açıklama
              </h3>
              <p className="text-base">{product.description}</p>
            </div>

            {/* Özellikler */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Özellikler
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-base">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Teknik Özellikler */}
            {product.specifications && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Teknik Özellikler
                </h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* İletişim Butonu */}
          <div className="sticky bottom-0 bg-background py-4">
            <Button asChild className="w-full" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp ile İletişime Geç
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop için dialog popup'ı
  const DesktopDetailDialog = () => (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          {/* Sol Taraf - Görsel */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Sağ Taraf - Bilgiler */}
          <div className="space-y-4">
            {/* Marka */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Marka
              </h3>
              <p className="text-base">{product.brand}</p>
            </div>

            {/* Açıklama */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Açıklama
              </h3>
              <p className="text-base">{product.description}</p>
            </div>

            {/* Özellikler */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Özellikler
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-base">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Teknik Özellikler */}
            {product.specifications && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Teknik Özellikler
                </h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* İletişim Butonu */}
            <Button asChild className="w-full" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp ile İletişime Geç
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div
        className={`group relative bg-card rounded-lg border transition-all duration-300 hover:shadow-lg ${
          isList ? "md:flex md:gap-6" : "flex flex-col"
        }`}
      >
        {/* Resim Bölümü */}
        <div
          className={`relative overflow-hidden rounded-t-lg ${
            isList
              ? "md:w-1/3 md:rounded-l-lg md:rounded-t-none h-[200px] md:h-auto"
              : "w-full aspect-[4/3]"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* İçerik Bölümü */}
        <div
          className={`flex flex-col ${isList ? "md:w-2/3 p-6" : "flex-1 p-4"}`}
        >
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Özellikler */}
          {isList && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Özellikler:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Butonlar */}
          <div className="mt-auto">
            <Button className="w-full" onClick={() => setIsDetailOpen(true)}>
              İncele
            </Button>
          </div>
        </div>
      </div>

      {/* Ekran boyutuna göre uygun popup'ı göster */}
      {isDetailOpen &&
        (isMobile ? <MobileDetailPopup /> : <DesktopDetailDialog />)}
    </>
  );
}
