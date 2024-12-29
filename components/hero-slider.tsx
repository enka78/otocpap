"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    image: "/slider/slide1.jpg",
    title: "CPAP Cihazları",
    description: "Uyku apnesi tedavisinde kullanılan en son teknoloji cihazlar",
  },
  {
    image: "/slider/slide2.jpg",
    title: "BiPAP Cihazları",
    description: "İki farklı basınç seviyesi ile konforlu tedavi imkanı",
  },
  {
    image: "/slider/slide3.jpg",
    title: "Oksijen Konsantratörleri",
    description: "Yüksek kaliteli, güvenilir oksijen tedavisi çözümleri",
  },
];

export function HeroSlider() {
  return (
    <div className="relative">
      <style jsx global>{`
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          display: none;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .hero-slider .swiper-button-next:after,
        .hero-slider .swiper-button-prev:after {
          font-size: 20px;
        }

        @media (min-width: 768px) {
          .hero-slider .swiper-button-next,
          .hero-slider .swiper-button-prev {
            display: flex;
          }
        }
      `}</style>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          enabled: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-slider w-full aspect-[16/9] md:aspect-[21/9]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center px-0 md:px-12">
                <div className="max-w-4xl mx-auto text-white text-center md:text-left px-4 md:px-0">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg opacity-90">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
