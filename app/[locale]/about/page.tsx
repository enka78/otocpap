"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const stats: Stat[] = [
  { value: 1000, label: "Mutlu Müşteri", suffix: "+" },
  { value: 10, label: "Yıllık Deneyim", suffix: "+" },
  { value: 50, label: "Ürün Çeşidi", suffix: "+" },
  { value: 24, label: "Teknik Servis", suffix: "/7" },
];

const timeline: TimelineEvent[] = [
  {
    year: "2013",
    title: "Şirketin Kuruluşu",
    description: "Dönüşüm Medikal, İstanbul'da kuruldu.",
  },
  {
    year: "2015",
    title: "İlk Şube",
    description: "Artan talep üzerine ilk şubemizi açtık.",
  },
  {
    year: "2018",
    title: "Ürün Yelpazesi Genişletildi",
    description:
      "CPAP ve BiPAP cihazlarına ek olarak oksijen konsantratörleri eklendi.",
  },
  {
    year: "2020",
    title: "Online Hizmet",
    description:
      "E-ticaret sitemiz ile online satış ve destek hizmeti başladı.",
  },
  {
    year: "2023",
    title: "Büyüme ve Gelişim",
    description: "Türkiye genelinde hizmet ağımızı genişlettik.",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 saniye
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Başlık ve Açıklama */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Hakkımızda
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Dönüşüm Medikal olarak, uyku ve solunum sağlığı alanında uzmanlaşmış
          bir sağlık ekipmanları tedarikçisiyiz. Misyonumuz, hastalarımıza en
          kaliteli CPAP, BiPAP ve oksijen konsantratörü cihazlarını sunarak
          yaşam kalitelerini artırmaktır.
        </p>
      </div>

      {/* Temsili Resim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-lg overflow-hidden group bg-gradient-to-br from-blue-500/10 to-blue-600/20 border"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Modern CPAP Cihazları
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              En son teknoloji uyku apnesi tedavi ekipmanları
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-lg overflow-hidden group bg-gradient-to-br from-blue-500/10 to-blue-600/20 border"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Uzman Ekibimiz
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Deneyimli ve profesyonel sağlık ekibi
            </p>
          </div>
        </motion.div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="text-center p-4 md:p-6 rounded-lg bg-card border hover:shadow-md transition-shadow"
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Zaman Çizelgesi */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-px" />
        {timeline.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`relative mb-8 md:mb-12 ${
              index % 2 === 0 ? "md:pr-8" : "md:pl-8"
            }`}
          >
            <div
              className={`flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`pl-8 md:pl-0 ${
                  index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                }`}
              >
                <div className="bg-card border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold mb-2 text-sm md:text-base">
                    {event.year}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
              {index % 2 === 1 && <div className="hidden md:block" />}
            </div>
            <div className="absolute left-4 md:left-1/2 top-6 w-2 h-2 bg-primary rounded-full transform -translate-x-[5px] md:-translate-x-[5px]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
