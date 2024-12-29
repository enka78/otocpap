"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    name: "AirSense 11 AutoSet",
    image: "/products/airsense.jpg",
    brand: "ResMed",
    category: "CPAP",
  },
  {
    id: 2,
    name: "DreamStation 2 Auto",
    image: "/products/dreamstation.jpg",
    brand: "Philips",
    category: "CPAP",
  },
  {
    id: 3,
    name: "AirCurve 10 VAuto",
    image: "/products/aircurve.jpg",
    brand: "ResMed",
    category: "BiPAP",
  },
  {
    id: 4,
    name: "F30i Tam Yüz Maskesi",
    image: "/products/f30i.jpg",
    brand: "ResMed",
    category: "Maske",
  },
];

export function ProductSlider() {
  return (
    <div className="relative">
      <style jsx global>{`
        .product-slider .swiper-button-next,
        .product-slider .swiper-button-prev {
          color: #666;
          transform: scale(0.7);
        }

        .product-slider .swiper-button-next:hover,
        .product-slider .swiper-button-prev:hover {
          color: #000;
        }

        .product-slider .swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          enabled: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="product-slider w-full px-4 md:px-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-card rounded-lg border p-4">
              <div className="relative aspect-square mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{product.brand}</span>
                <span>{product.category}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
