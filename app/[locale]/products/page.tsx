"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3, List as ListIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";

type ViewMode = "grid-4" | "grid-3" | "list";

const brands = [
  { id: "philips", label: "Philips Respironics" },
  { id: "resmed", label: "ResMed" },
  { id: "fisher", label: "Fisher & Paykel" },
  { id: "devilbiss", label: "DeVilbiss" },
  { id: "inogen", label: "Inogen" },
];

const categories = [
  { id: "cpap", label: "CPAP" },
  { id: "bipap", label: "BiPAP" },
  { id: "masks", label: "Maskeler" },
  { id: "accessories", label: "Aksesuarlar" },
  { id: "oksijen-konsantratoru", label: "Oksijen Konsantratörü" },
];

// Örnek ürün verileri
const products = [
  {
    id: 1,
    name: "AirSense 11 AutoSet",
    category: "cpap",
    brand: "resmed",
    image: "https://placehold.co/600x400/png?text=AirSense+11",
    description:
      "Yeni nesil otomatik CPAP cihazı, gelişmiş uyku terapisi için tasarlandı.",
    features: [
      "Otomatik basınç ayarı",
      "Kablosuz bağlantı",
      "Akıllı başlatma/durdurma",
      "Isıtmalı nemlendirici",
      "Sessiz çalışma",
    ],
    specifications: {
      "Basınç Aralığı": "4-20 cmH2O",
      "Gürültü Seviyesi": "<25 dBA",
      Ekran: "Renkli dokunmatik",
      Boyutlar: "16.5 x 15 x 10 cm",
      Ağırlık: "1.1 kg",
    },
  },
  {
    id: 2,
    name: "DreamStation 2 Auto",
    category: "cpap",
    brand: "philips",
    image: "https://placehold.co/600x400/png?text=DreamStation+2",
    description:
      "Kompakt ve kullanıcı dostu tasarıma sahip otomatik CPAP cihazı.",
    features: [
      "SmartRamp teknolojisi",
      "Bluetooth bağlantısı",
      "Dokunmatik ekran",
      "Entegre nemlendirici",
      "Otomatik yükseklik ayarı",
    ],
    specifications: {
      "Basınç Aralığı": "4-20 cmH2O",
      "Gürültü Seviyesi": "<27 dBA",
      Ekran: "Renkli LCD",
      Boyutlar: "15 x 14 x 9 cm",
      Ağırlık: "0.9 kg",
    },
  },
  {
    id: 3,
    name: "AirCurve 10 VAuto",
    category: "bipap",
    brand: "resmed",
    image: "https://placehold.co/600x400/png?text=AirCurve+10",
    description: "İleri düzey BiPAP cihazı, konforlu solunum desteği sağlar.",
    features: [
      "VAuto algoritması",
      "ClimateLineAir ısıtmalı hortum",
      "Entegre nemlendirici",
      "Kablosuz veri aktarımı",
      "Gelişmiş olay tespiti",
    ],
    specifications: {
      "IPAP Aralığı": "4-25 cmH2O",
      "EPAP Aralığı": "4-20 cmH2O",
      "Gürültü Seviyesi": "<28 dBA",
      Boyutlar: "15.5 x 15 x 11 cm",
      Ağırlık: "1.3 kg",
    },
  },
  {
    id: 4,
    name: "F30i Tam Yüz Maskesi",
    category: "masks",
    brand: "resmed",
    image: "https://placehold.co/600x400/png?text=F30i+Mask",
    description: "Üstten bağlantılı, minimal temaslı tam yüz maskesi.",
    features: [
      "Üstten bağlantı tasarımı",
      "Manyetik klipsler",
      "QuietAir teknolojisi",
      "Yumuşak silikon yastık",
      "Ayarlanabilir başlık",
    ],
    specifications: {
      Boyutlar: "S, M, L",
      Malzeme: "Silikon",
      Ağırlık: "95g",
      Garanti: "90 gün",
      Uyumluluk: "Tüm CPAP/BiPAP",
    },
  },
  {
    id: 5,
    name: "DreamWear Nazal Maske",
    category: "masks",
    brand: "philips",
    image: "https://placehold.co/600x400/png?text=DreamWear",
    description: "Minimal temaslı, konforlu nazal maske.",
    features: [
      "Modüler tasarım",
      "Alttan hortum bağlantısı",
      "Silikon yastık",
      "Kolay ayarlanabilir başlık",
      "360° dönebilen dirsek",
    ],
    specifications: {
      Boyutlar: "S, M, L, MW",
      Malzeme: "Silikon + Naylon",
      Ağırlık: "85g",
      Garanti: "90 gün",
      Uyumluluk: "Universal",
    },
  },
  {
    id: 6,
    name: "SleepStyle Auto",
    category: "cpap",
    brand: "fisher",
    image: "https://placehold.co/600x400/png?text=SleepStyle",
    description: "Akıllı algoritmalı, kullanıcı dostu CPAP cihazı.",
    features: [
      "ThermoSmart teknolojisi",
      "Otomatik basınç ayarı",
      "Entegre nemlendirici",
      "Veri raporlama",
      "Sessiz çalışma",
    ],
    specifications: {
      "Basınç Aralığı": "4-20 cmH2O",
      "Gürültü Seviyesi": "<28 dBA",
      Ekran: "LCD",
      Boyutlar: "16 x 17 x 11 cm",
      Ağırlık: "1.2 kg",
    },
  },
  {
    id: 7,
    name: "IntelliPAP 2 AutoAdjust",
    category: "cpap",
    brand: "devilbiss",
    image: "https://placehold.co/600x400/png?text=IntelliPAP+2",
    description: "Otomatik basınç ayarlı, kompakt CPAP cihazı.",
    features: [
      "SmartFlex teknolojisi",
      "Otomatik yükseklik ayarı",
      "Entegre nemlendirici",
      "SmartCode raporlama",
      "Hafif tasarım",
    ],
    specifications: {
      "Basınç Aralığı": "3-20 cmH2O",
      "Gürültü Seviyesi": "<26 dBA",
      Ekran: "LED",
      Boyutlar: "15.5 x 15 x 10 cm",
      Ağırlık: "1.0 kg",
    },
  },
  {
    id: 8,
    name: "Vitera Tam Yüz Maskesi",
    category: "masks",
    brand: "fisher",
    image: "https://placehold.co/600x400/png?text=Vitera",
    description: "Geniş görüş alanı sunan konforlu tam yüz maskesi.",
    features: [
      "Geniş görüş alanı",
      "RollFit XT teknolojisi",
      "VentiCool teknolojisi",
      "Ayarlanabilir başlık",
      "Sessiz havalandırma",
    ],
    specifications: {
      Boyutlar: "S, M, L",
      Malzeme: "Silikon",
      Ağırlık: "98g",
      Garanti: "90 gün",
      Uyumluluk: "Universal",
    },
  },
  {
    id: 9,
    name: "BiPAP A40 Pro",
    category: "bipap",
    brand: "philips",
    image: "https://placehold.co/600x400/png?text=BiPAP+A40",
    description: "Profesyonel kullanım için tasarlanmış BiPAP cihazı.",
    features: [
      "AVAPS-AE teknolojisi",
      "Batarya desteği",
      "Dokunmatik ekran",
      "Bluetooth bağlantısı",
      "Detaylı raporlama",
    ],
    specifications: {
      "IPAP Aralığı": "4-40 cmH2O",
      "EPAP Aralığı": "4-25 cmH2O",
      Ekran: '7" Renkli dokunmatik',
      Boyutlar: "22 x 18 x 12 cm",
      Ağırlık: "2.1 kg",
    },
  },
  {
    id: 10,
    name: "G5 Oksijen Konsantratörü",
    category: "accessories",
    brand: "inogen",
    image: "https://placehold.co/600x400/png?text=Inogen+G5",
    description: "Taşınabilir, yüksek performanslı oksijen konsantratörü.",
    features: [
      "6 akış ayarı",
      "Uzun pil ömrü",
      "Bluetooth bağlantısı",
      "Sessiz çalışma",
      "Kompakt tasarım",
    ],
    specifications: {
      "Akış Hızı": "1-6 L/dk",
      "Pil Ömrü": "13 saat",
      "Gürültü Seviyesi": "<38 dBA",
      Boyutlar: "18 x 8 x 15 cm",
      Ağırlık: "2.2 kg",
    },
  },
  {
    id: "inogen-g5",
    name: "Inogen G5 Oksijen Konsantratörü",
    category: "oksijen-konsantratoru",
    brand: "Inogen",
    image: "/images/products/inogen-g5.jpg",
    description: "Taşınabilir oksijen konsantratörü, 6 akış ayarı",
    features: [
      "6L/dk akış kapasitesi",
      "Şarj edilebilir batarya",
      "Kompakt tasarım",
    ],
    specifications: {
      weight: "2.2 kg",
      dimensions: "18.3 x 8.3 x 18.3 cm",
      batteryLife: "6.5 saat (ayar 2'de)",
      noiseLevel: "38 dB",
    },
  },
  {
    id: "philips-everflo",
    name: "Philips EverFlo Oksijen Konsantratörü",
    category: "oksijen-konsantratoru",
    brand: "Philips",
    image: "/images/products/everflo.jpg",
    description: "Ev tipi oksijen konsantratörü, güvenilir performans",
    features: [
      "5L/dk akış kapasitesi",
      "Düşük enerji tüketimi",
      "Sessiz çalışma",
    ],
    specifications: {
      weight: "14 kg",
      dimensions: "58 x 38 x 24 cm",
      powerConsumption: "350W",
      noiseLevel: "45 dB",
    },
  },
  {
    id: "devilbiss-525",
    name: "DeVilbiss 525 Oksijen Konsantratörü",
    category: "oksijen-konsantratoru",
    brand: "DeVilbiss",
    image: "/images/products/devilbiss-525.jpg",
    description: "Kompakt ev tipi oksijen konsantratörü",
    features: ["5L/dk akış kapasitesi", "OSD ekran", "Kolay kullanım"],
    specifications: {
      weight: "16.3 kg",
      dimensions: "62.2 x 34.2 x 30.4 cm",
      powerConsumption: "310W",
      noiseLevel: "44 dB",
    },
  },
];

export default function ProductsPage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid-3");
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // URL'den aktif filtreleri al
  const activeBrands = searchParams.get("brands")?.split(",") || [];
  const activeCategories = searchParams.get("categories")?.split(",") || [];

  // Filtrelenmiş ürünleri hesapla
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.includes(product.category);
      const matchesBrand =
        activeBrands.length === 0 || activeBrands.includes(product.brand);
      return matchesCategory && matchesBrand;
    });
  }, [activeCategories, activeBrands]);

  // URL'yi güncelle
  const updateFilters = (
    type: "brands" | "categories",
    value: string,
    checked: boolean
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentValues =
      newSearchParams.get(type)?.split(",").filter(Boolean) || [];

    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    if (newValues.length > 0) {
      newSearchParams.set(type, newValues.join(","));
    } else {
      newSearchParams.delete(type);
    }

    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    updateFilters("brands", brandId, checked);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    updateFilters("categories", categoryId, checked);
  };

  const getTitle = () => {
    const categoryLabels = categories
      .filter((c) => activeCategories.includes(c.id))
      .map((c) => c.label);

    const brandLabels = brands
      .filter((b) => activeBrands.includes(b.id))
      .map((b) => b.label);

    if (categoryLabels.length > 0 && brandLabels.length > 0) {
      return `${categoryLabels.join(", ")} - ${brandLabels.join(", ")}`;
    }
    if (categoryLabels.length > 0) {
      return categoryLabels.join(", ");
    }
    if (brandLabels.length > 0) {
      return brandLabels.join(", ");
    }
    return "Tüm Ürünler";
  };

  return (
    <div className="container px-4 md:px-4 py-4 md:py-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Filtreler - Mobilde Üstte, Desktop'ta Sol Tarafta */}
        <aside className="w-full md:w-1/4 space-y-4 md:space-y-6">
          <Accordion type="multiple" defaultValue={["categories", "brands"]}>
            <AccordionItem value="categories">
              <AccordionTrigger>Kategoriler</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={activeCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brands">
              <AccordionTrigger>Markalar</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={activeBrands.includes(brand.id)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Aktif Filtreler */}
          {(activeBrands.length > 0 || activeCategories.length > 0) && (
            <div className="space-y-2">
              <h3 className="font-medium">Aktif Filtreler</h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter((c) => activeCategories.includes(c.id))
                  .map((category) => (
                    <Button
                      key={category.id}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCategoryChange(category.id, false)}
                    >
                      {category.label} ×
                    </Button>
                  ))}
                {brands
                  .filter((b) => activeBrands.includes(b.id))
                  .map((brand) => (
                    <Button
                      key={brand.id}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleBrandChange(brand.id, false)}
                    >
                      {brand.label} ×
                    </Button>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/products")}
                >
                  Tümünü Temizle
                </Button>
              </div>
            </div>
          )}
        </aside>

        {/* Ürün Listesi - Mobilde Altta, Desktop'ta Sağ Tarafta */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{getTitle()}</h1>
              <p className="text-sm text-gray-500 mt-1">
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
      </div>
    </div>
  );
}
