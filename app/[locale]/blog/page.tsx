"use client";

import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Uyku Apnesi Nedir?",
    content: `Uyku apnesi, uyku sırasında nefes alıp vermenin durması veya azalması ile karakterize edilen bir uyku bozukluğudur. Bu durumlar genellikle 10 saniye veya daha uzun sürer ve gece boyunca yüzlerce kez tekrarlanabilir.

En yaygın türü olan Obstrüktif Uyku Apnesi (OSA), üst solunum yolunun kısmen veya tamamen tıkanması sonucu ortaya çıkar. Bu tıkanma, genellikle dilin veya yumuşak dokunun geriye kayması nedeniyle oluşur.

Belirtiler:
- Horlama
- Gündüz aşırı uyku hali
- Sabah baş ağrıları
- Konsantrasyon güçlüğü
- Hafıza sorunları
- Gece sık uyanma

Tedavi edilmediğinde:
- Yüksek tansiyon
- Kalp hastalıkları
- Tip 2 diyabet
- Depresyon
gibi ciddi sağlık sorunlarına yol açabilir.`,
    date: "2023-12-20",
  },
  {
    id: 2,
    title: "CPAP Cihazı Kullanım Rehberi",
    content: `CPAP (Continuous Positive Airway Pressure) cihazı, uyku apnesi tedavisinde en yaygın kullanılan yöntemdir. Bu rehber, CPAP cihazınızı en etkili şekilde kullanmanıza yardımcı olacaktır.

Temel Kullanım Adımları:
1. Cihazı düz bir zemine yerleştirin
2. Su haznesini temiz su ile doldurun
3. Maskeyi yüzünüze uygun şekilde takın
4. Cihazı çalıştırın ve rahat bir pozisyonda uyumaya çalışın

Temizlik ve Bakım:
- Maskeyi her gün temizleyin
- Su haznesini haftada bir kez dezenfekte edin
- Hortumu düzenli olarak kontrol edin
- Filtreleri aylık olarak değiştirin

Sık Karşılaşılan Sorunlar:
1. Maske sızıntısı
2. Burun kuruluğu
3. Cilt tahrişi
4. Gürültü

Bu sorunların çoğu basit ayarlamalarla çözülebilir. Ciddi sorunlar için mutlaka doktorunuza danışın.`,
    date: "2023-12-15",
  },
  {
    id: 3,
    title: "BiPAP ve CPAP Arasındaki Farklar",
    content: `BiPAP (Bi-level Positive Airway Pressure) ve CPAP (Continuous Positive Airway Pressure) cihazları, uyku apnesi tedavisinde kullanılan iki farklı tedavi yöntemidir.

CPAP:
- Tek bir basınç seviyesi kullanır
- Nefes alıp verme sırasında aynı basıncı uygular
- Kullanımı daha basittir
- Daha ekonomiktir

BiPAP:
- İki farklı basınç seviyesi kullanır
- Nefes alma sırasında yüksek, verme sırasında düşük basınç uygular
- Daha kompleks vakalarda tercih edilir
- CPAP'a göre daha pahalıdır

BiPAP genellikle şu durumlarda tercih edilir:
- CPAP tedavisine yanıt alınamadığında
- Yüksek basınç ihtiyacı olduğunda
- KOAH gibi ek solunum problemleri varsa
- Kalp yetmezliği durumlarında

Hangi cihazın size uygun olduğuna doktorunuz karar verecektir.`,
    date: "2023-12-10",
  },
];

export default function BlogPage() {
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc"
  );

  const sortedPosts = React.useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [sortDirection]);

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Faydalı Bilgiler</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSort}
          className="h-8 w-8"
        >
          {sortDirection === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {sortedPosts.map((post) => (
          <AccordionItem
            key={post.id}
            value={post.id.toString()}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left">
                <span className="font-medium">{post.title}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {post.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
