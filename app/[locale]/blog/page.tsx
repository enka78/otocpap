"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

export default function BlogPage() {
  const t = useTranslations();
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const blogPosts = [
    {
      title: "Uyku Apnesi Nedir?",
      date: "2024-01-15",
      summary:
        "Uyku apnesi, uyku sırasında solunum duraklamaları ile karakterize edilen ciddi bir uyku bozukluğudur. Bu duraklamalar genellikle 10 saniye veya daha uzun sürer.",
      content: `Uyku apnesi, uyku kalitesini önemli ölçüde etkileyen ve tedavi edilmediğinde ciddi sağlık sorunlarına yol açabilen bir rahatsızlıktır.

      Belirtileri:
      • Horlama
      • Gündüz aşırı uyku hali
      • Sabah baş ağrıları
      • Konsantrasyon bozukluğu
      • Yorgunluk
      
      Risk Faktörleri:
      • Fazla kilo
      • İleri yaş
      • Erkek cinsiyet
      • Boyun çevresinin kalın olması
      • Aile öyküsü
      
      Tedavi edilmediğinde:
      • Yüksek tansiyon
      • Kalp hastalıkları
      • Tip 2 diyabet
      • İş ve trafik kazaları riski
      gibi ciddi sorunlara yol açabilir.`,
    },
    {
      title: "CPAP Cihazı Nedir ve Nasıl Kullanılır?",
      date: "2024-01-10",
      summary:
        "CPAP (Continuous Positive Airway Pressure) cihazları, uyku apnesi tedavisinde kullanılan ve sürekli pozitif hava basıncı sağlayan medikal cihazlardır.",
      content: `CPAP cihazları, uyku apnesi tedavisinde altın standart olarak kabul edilir ve hastaların yaşam kalitesini önemli ölçüde artırır.

      Kullanım Adımları:
      1. Cihazı düz bir zemine yerleştirin
      2. Su haznesini temiz su ile doldurun
      3. Maskeyi yüzünüze uygun şekilde takın
      4. Cihazı çalıştırın ve rahat bir pozisyonda uyumaya çalışın
      
      Bakım ve Temizlik:
      • Maskeyi her gün temizleyin
      • Su haznesini günlük olarak boşaltın ve temizleyin
      • Hortumu haftada bir kez temizleyin
      • Filtreleri düzenli olarak kontrol edin ve değiştirin
      
      Dikkat Edilmesi Gerekenler:
      • Maskenin yüzünüze tam oturduğundan emin olun
      • Düzenli olarak doktor kontrolüne gidin
      • Cihaz ayarlarını doktorunuza danışmadan değiştirmeyin`,
    },
    {
      title: "BiPAP ve CPAP Arasındaki Farklar",
      date: "2024-01-05",
      summary:
        "BiPAP cihazları, CPAP'tan farklı olarak nefes alıp verme sırasında iki farklı basınç seviyesi uygular. Bu özellik bazı hastalar için daha konforlu bir tedavi sağlar.",
      content: `BiPAP (Bi-level Positive Airway Pressure) ve CPAP arasındaki temel farklar:

      BiPAP'ın Özellikleri:
      • Nefes alırken daha yüksek basınç (IPAP)
      • Nefes verirken daha düşük basınç (EPAP)
      • Daha doğal bir solunum hissi
      • Akciğer hastalıkları olan hastalar için daha uygun
      
      CPAP'ın Özellikleri:
      • Sabit basınç
      • Daha basit kullanım
      • Daha ekonomik
      • Çoğu uyku apnesi hastası için yeterli
      
      Hangi Cihaz Size Uygun?
      • Doktorunuz, uyku testi sonuçlarınıza göre
      • Eşlik eden hastalıklarınıza göre
      • Konfor tercihlerinize göre
      size en uygun cihazı önerecektir.`,
    },
    {
      title: "Oksijen Konsantratörü Kullanımı",
      date: "2023-12-28",
      summary:
        "Oksijen konsantratörleri, havadaki oksijeni yoğunlaştırarak kullanan ve oksijen tedavisi gereken hastalara sürekli oksijen sağlayan cihazlardır.",
      content: `Oksijen konsantratörleri, kronik solunum yetmezliği olan hastalar için hayati önem taşır.

      Kullanım Alanları:
      • KOAH (Kronik Obstrüktif Akciğer Hastalığı)
      • Akciğer fibrozisi
      • Kalp yetmezliği
      • Uyku apnesi ile birlikte görülen oksijen düşüklüğü
      
      Cihaz Seçimi:
      • Sabit veya taşınabilir olması
      • Akış hızı kapasitesi
      • Elektrik tüketimi
      • Ses seviyesi
      • Ek özellikler (nem, filtre vb.)
      
      Güvenlik Önlemleri:
      • Sigara içilen ortamda kullanmayın
      • Cihazı düzenli olarak temizleyin
      • Filtreleri zamanında değiştirin
      • Hortum ve kanülleri kontrol edin`,
    },
    {
      title: "CPAP Maskesi Seçimi ve Bakımı",
      date: "2023-12-20",
      summary:
        "Doğru maske seçimi ve düzenli bakımı, CPAP tedavisinin başarısında kritik rol oynar. Yüz yapınıza ve uyku pozisyonunuza uygun maske seçimi önemlidir.",
      content: `Maske Tipleri:
      1. Nazal Maske:
      • Sadece burnu kapsar
      • Minimal temas alanı
      • Gözlük kullananlar için uygun
      
      2. Tam Yüz Maskesi:
      • Burun ve ağzı kapsar
      • Ağız solunumu yapanlar için ideal
      • Yüksek basınçlarda daha etkili
      
      3. Nazal Yastık:
      • En minimal temas
      • Klaustrofobisi olanlar için uygun
      • Yan yatanlar için ideal
      
      Maske Bakımı:
      • Her sabah ılık su ve sabunla yıkayın
      • Haftalık olarak detaylı temizlik yapın
      • Yıpranma belirtilerini kontrol edin
      • 6-12 ayda bir değiştirin
      
      Doğru Maske Seçimi İçin:
      • Yüz yapınızı değerlendirin
      • Uyku pozisyonunuzu dikkate alın
      • Farklı maskeleri deneme imkanı isteyin
      • Uzman görüşü alın`,
    },
  ];

  const sortedPosts = React.useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Faydalı Bilgiler</h1>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center gap-2"
          >
            <CalendarDays className="h-4 w-4" />
            Tarihe Göre
            {sortOrder === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-6">
          {sortedPosts.map((post, index) => (
            <div key={index} className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.summary}</p>
              <Accordion type="single" collapsible>
                <AccordionItem value="content">
                  <AccordionTrigger>Devamını Oku</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {post.content}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
