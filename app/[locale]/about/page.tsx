"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, Shield, Truck, Clock } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Müşteri Odaklılık",
      description:
        "Her zaman müşterilerimizin ihtiyaçlarını ön planda tutuyoruz.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Kalite",
      description: "En kaliteli ürünleri en uygun fiyatlarla sunuyoruz.",
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Hızlı Teslimat",
      description: "Siparişlerinizi en hızlı şekilde size ulaştırıyoruz.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "7/24 Destek",
      description: "Teknik destek ekibimiz her zaman yanınızda.",
    },
  ];

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Hakkımızda</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          2010 yılından beri CPAP, BiPAP ve oksijen konsantratörü alanında
          hizmet veriyoruz.
        </p>
      </div>

      {/* Şirket Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Biz Kimiz?</h2>
          <p className="text-muted-foreground">
            OTOCPAP olarak, uyku apnesi ve solunum tedavisi alanında Türkiye'nin
            önde gelen medikal cihaz tedarikçisiyiz. Müşterilerimize en kaliteli
            ürünleri sunmak ve en iyi hizmeti vermek için çalışıyoruz.
          </p>
          <p className="text-muted-foreground">
            Deneyimli ekibimiz ve geniş ürün yelpazemizle, hastalarımızın
            ihtiyaçlarına en uygun çözümleri sunuyoruz. Amacımız, uyku apnesi
            hastalarının hayat kalitesini artırmak ve onlara daha iyi bir uyku
            deneyimi yaşatmak.
          </p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/800x450/png?text=About+Us"
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Değerlerimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-lg border text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-primary/5 rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">13+</div>
            <div className="text-sm text-muted-foreground">Yıllık Deneyim</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Ürün Çeşidi</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">7/24</div>
            <div className="text-sm text-muted-foreground">Teknik Destek</div>
          </div>
        </div>
      </div>
    </div>
  );
}
