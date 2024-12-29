"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "Uyku Apnesi Tedavi Seti",
    image: "/images/featured-1.jpg",
    description: "Konforlu ve etkili uyku apnesi tedavisi için komple set",
    details:
      "Yüksek kaliteli CPAP cihazı, konforlu maske ve aksesuarlardan oluşan set, uyku apnesi tedavisinde maksimum verim sağlar. Otomatik basınç ayarı ve sessiz çalışma özelliği ile rahat bir uyku deneyimi sunar.",
  },
  {
    id: 2,
    name: "Profesyonel Solunum Seti",
    image: "/images/featured-2.jpg",
    description: "Evde solunum tedavisi için profesyonel ekipman seti",
    details:
      "Nebulizatör, oksijen konsantratörü ve gerekli aksesuarları içeren profesyonel set, evde solunum tedavisi gören hastalar için ideal çözüm sunar. Kolay kullanım ve yüksek performans özellikleri ile öne çıkar.",
  },
  {
    id: 3,
    name: "Hasta Bakım Paketi",
    image: "/images/featured-3.jpg",
    description: "Kapsamlı evde hasta bakım ekipmanları",
    details:
      "Hasta yatağı, hasta bezi, tekerlekli sandalye ve diğer bakım ürünlerini içeren kapsamlı set, evde hasta bakımını kolaylaştırır. Yüksek kaliteli malzemeler ve ergonomik tasarım ile hasta konforunu ön planda tutar.",
  },
  {
    id: 4,
    name: "Tansiyon Takip Seti",
    image: "/images/featured-4.jpg",
    description: "Profesyonel tansiyon ve nabız takip ekipmanları",
    details:
      "Dijital tansiyon aleti, nabız oksimetre ve diğer ölçüm cihazlarını içeren set, düzenli sağlık takibi için ideal çözüm sunar. Hassas ölçüm teknolojisi ve kullanıcı dostu arayüz ile kolay kullanım sağlar.",
  },
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-[600px] rounded-lg overflow-hidden">
        <Image
          src="/images/featured-main.jpg"
          alt="Featured Product"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Premium Medikal Ürünler</h3>
          <p className="mb-4">
            En son teknoloji ile üretilmiş yüksek kaliteli medikal cihazlar
          </p>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black"
          >
            Tüm Ürünleri İncele
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {featuredProducts.map((product) => (
          <Dialog key={product.id}>
            <DialogTrigger asChild>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                  <p className="text-gray-600 mb-6">{product.details}</p>
                  <Button asChild>
                    <a href="/shop" className="w-full">
                      Fiyat Bilgisi İçin İletişime Geçin
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
