"use client";

import React from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Symptom {
  id: string;
  label: string;
}

interface Risk {
  id: string;
  title: string;
  description: string;
}

const symptoms: Symptom[] = [
  { id: "loud-snoring", label: "Yüksek sesli horlama" },
  { id: "breathing-stops", label: "Uyku sırasında nefes durmaları" },
  { id: "daytime-sleepiness", label: "Gündüz aşırı uyku hali" },
  { id: "morning-headache", label: "Sabah baş ağrısı" },
  { id: "concentration", label: "Konsantrasyon güçlüğü" },
  { id: "irritability", label: "Sinirlilik ve ruh hali değişiklikleri" },
  { id: "night-sweats", label: "Gece terlemeleri" },
  { id: "dry-mouth", label: "Ağız kuruluğu ile uyanma" },
  { id: "insomnia", label: "Uykusuzluk veya huzursuz uyku" },
  { id: "frequent-urination", label: "Gece sık idrara çıkma" },
];

const healthRisks: Risk[] = [
  {
    id: "heart",
    title: "Kalp Hastalıkları",
    description: "Yüksek tansiyon, kalp ritim bozuklukları ve kalp krizi riski",
  },
  {
    id: "diabetes",
    title: "Tip 2 Diyabet",
    description: "İnsülin direnci ve kan şekeri kontrolünde zorluklar",
  },
  {
    id: "brain",
    title: "Nörolojik Sorunlar",
    description: "Hafıza kaybı, konsantrasyon bozukluğu ve depresyon",
  },
  {
    id: "accidents",
    title: "Kaza Riski",
    description: "Gündüz uyku hali nedeniyle iş ve trafik kazası riski",
  },
];

export default function SleepTestPage() {
  const t = useTranslations();
  const [checkedSymptoms, setCheckedSymptoms] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
  });
  const [showRiskDialog, setShowRiskDialog] = React.useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setCheckedSymptoms((prev) => {
      const newChecked = checked
        ? [...prev, symptomId]
        : prev.filter((id) => id !== symptomId);

      // Show dialog when 3 or more symptoms are checked
      if (newChecked.length >= 3) {
        setShowRiskDialog(true);
      }

      return newChecked;
    });
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Reset everything when dialog closes
      setCheckedSymptoms([]);
      setFormData({ name: "", phone: "" });
    }
    setShowRiskDialog(open);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSymptoms = symptoms
      .filter((s) => checkedSymptoms.includes(s.id))
      .map((s) => s.label)
      .join("\n- ");

    const message = encodeURIComponent(
      `Merhaba, uyku testi için başvuru:

Ad Soyad: ${formData.name}
Telefon: ${formData.phone}

Belirtiler:
- ${selectedSymptoms}`
    );

    window.open(`https://wa.me/905532808273?text=${message}`, "_blank");
  };

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4">Uyku Apnesi Risk Testi</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kaliteli bir uyku, sağlıklı bir yaşamın temelidir. Ancak uyku
                apnesi, bu kaliteyi ciddi şekilde etkileyebilir.
              </p>
              <p>
                Aşağıdaki belirtilerden size uyanları işaretleyin. Uyku apnesi
                riski taşıyor olabilirsiniz.
              </p>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border">
            <Image
              src="https://placehold.co/800x600/eee/aaa?text=Doktor+Görseli"
              alt="Uyku Doktoru"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tedavi Edilmezse?</h2>
            <p className="text-muted-foreground mb-6">
              Uyku apnesi tedavi edilmediğinde aşağıdaki sağlık sorunlarına yol
              açabilir:
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {healthRisks.map((risk) => (
              <div
                key={risk.id}
                className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">{risk.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {risk.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Belirtiler</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                onClick={() =>
                  handleSymptomChange(
                    symptom.id,
                    !checkedSymptoms.includes(symptom.id)
                  )
                }
              >
                <Checkbox
                  id={symptom.id}
                  checked={checkedSymptoms.includes(symptom.id)}
                  disabled
                  className="pointer-events-none"
                />
                <label
                  htmlFor={symptom.id}
                  className="flex-1 text-sm font-medium leading-none cursor-pointer"
                >
                  {symptom.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={showRiskDialog} onOpenChange={handleDialogChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Uyku Apnesi Riski Tespit Edildi
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-6 pt-4">
                  <div className="text-muted-foreground">
                    İşaretlediğiniz belirtiler, uyku apnesi riski taşıdığınızı
                    gösteriyor. Size özel uyku testi randevusu için lütfen
                    bilgilerinizi bırakın.
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Adınız Soyadınız"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Telefon Numaranız"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                    <Button type="submit" className="w-full">
                      WhatsApp ile İletişime Geç
                    </Button>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
