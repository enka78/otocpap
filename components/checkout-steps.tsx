"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";

interface CheckoutStepsProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  cartItems: any[];
}

type DeliveryAddress = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  country: string;
};

type PaymentMethod = "havale" | "kapidaodeme";

const SHIPPING_COST = {
  DOMESTIC: 600,
  INTERNATIONAL: 800,
};

const BANK_ACCOUNTS = [
  {
    bank: "Ziraat Bankası",
    branch: "İstanbul Şubesi",
    accountHolder: "OtoCPAP Medikal Ltd. Şti.",
    iban: "TR12 3456 7890 1234 5678 9012 34",
  },
  {
    bank: "İş Bankası",
    branch: "İstanbul Şubesi",
    accountHolder: "OtoCPAP Medikal Ltd. Şti.",
    iban: "TR98 7654 3210 9876 5432 1098 76",
  },
];

export function CheckoutSteps({
  isOpen,
  onClose,
  totalPrice,
  cartItems,
}: CheckoutStepsProps) {
  const [step, setStep] = React.useState(1);
  const [deliveryAddress, setDeliveryAddress] = React.useState<DeliveryAddress>(
    {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      country: "Türkiye",
    }
  );
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("havale");
  const { toast } = useToast();
  const dispatch = useDispatch();

  // Teslimat konumu kontrolleri
  const isInIstanbul = deliveryAddress.city.toLowerCase().includes("istanbul");
  const isInTurkey = deliveryAddress.country.toLowerCase() === "türkiye";

  // Kargo ücretini hesapla
  const calculateShippingCost = () => {
    if (!deliveryAddress.city || !deliveryAddress.country) return 0;

    // İstanbul içi ücretsiz teslimat (cihaz satın alındıysa)
    if (isInIstanbul && hasDevice) {
      return 0;
    }

    // Yurt dışı kargo ücreti
    if (!isInTurkey) {
      return SHIPPING_COST.INTERNATIONAL; // 800 TL
    }

    // Yurt içi kargo ücreti (İstanbul dahil)
    return SHIPPING_COST.DOMESTIC; // 600 TL
  };

  // Adım 2'ye geçerken ödeme metodunu kontrol et ve gerekirse güncelle
  React.useEffect(() => {
    if (!isInIstanbul && paymentMethod === "kapidaodeme") {
      setPaymentMethod("havale");
      toast({
        title: "Bilgi",
        description: "Kapıda ödeme seçeneği sadece İstanbul için geçerlidir.",
      });
    }
  }, [isInIstanbul, paymentMethod]);

  // Cihaz satın alınıp alınmadığını kontrol et
  const hasDevice = cartItems.some((item) =>
    ["cpap", "bipap", "oxygen_concentrator"].includes(
      item.category.toLowerCase()
    )
  );

  const shippingCost = calculateShippingCost();
  const finalTotal = totalPrice + shippingCost;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adres bilgilerinin doluluğunu kontrol et
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.phone ||
      !deliveryAddress.address ||
      !deliveryAddress.city ||
      !deliveryAddress.district ||
      !deliveryAddress.country
    ) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    // WhatsApp mesajını oluştur
    const message = `Merhaba, aşağıdaki sipariş detayları için bilgi almak istiyorum:

🛒 Sipariş Detayları:
${cartItems
  .map(
    (item) =>
      `- ${item.title} (${item.quantity} adet) - ${new Intl.NumberFormat(
        "tr-TR",
        {
          style: "currency",
          currency: "TRY",
        }
      ).format(item.price * item.quantity)}`
  )
  .join("\n")}

💰 Ara Toplam: ${new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(totalPrice)}
🚚 Kargo Ücreti: ${new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(shippingCost)}
💰 Genel Toplam: ${new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(finalTotal)}

📦 Teslimat Bilgileri:
Ad Soyad: ${deliveryAddress.fullName}
Telefon: ${deliveryAddress.phone}
Adres: ${deliveryAddress.address}
İl: ${deliveryAddress.city}
İlçe: ${deliveryAddress.district}
Ülke: ${deliveryAddress.country}

💳 Ödeme Yöntemi: ${
      paymentMethod === "havale" ? "Havale/EFT" : "Kapıda Ödeme"
    }${
      paymentMethod === "havale"
        ? `\n\n🏦 Banka Hesap Bilgileri:\n${BANK_ACCOUNTS.map(
            (acc) => `\n${acc.bank}
Şube: ${acc.branch}
Hesap Sahibi: ${acc.accountHolder}
IBAN: ${acc.iban}`
          ).join("\n")}`
        : ""
    }`;

    // WhatsApp linkini oluştur ve yönlendir
    const whatsappUrl = `https://wa.me/905532808273?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Sepeti temizle ve popup'ı kapat
    dispatch(clearCart());
    onClose();

    // Başarılı mesajı göster
    toast({
      title: "Başarılı",
      description:
        "Siparişiniz başarıyla oluşturuldu. WhatsApp üzerinden sizinle iletişime geçeceğiz.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Teslimat Adresi" : "Ödeme Yöntemi"}
          </DialogTitle>
          {step === 2 && (
            <div className="text-sm text-muted-foreground">
              {isInTurkey
                ? isInIstanbul
                  ? "İstanbul içi teslimat için kapıda ödeme veya havale/EFT seçebilirsiniz."
                  : "İstanbul dışı teslimat için sadece havale/EFT ile ödeme yapabilirsiniz."
                : "Yurt dışı teslimat için sadece havale/EFT ile ödeme yapabilirsiniz."}
            </div>
          )}
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Ad Soyad</Label>
              <Input
                id="fullName"
                value={deliveryAddress.fullName}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    fullName: e.target.value,
                  })
                }
                placeholder="Ad Soyad"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={deliveryAddress.phone}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    phone: e.target.value,
                  })
                }
                placeholder="Telefon Numarası"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                value={deliveryAddress.address}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    address: e.target.value,
                  })
                }
                placeholder="Açık Adres"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">İl</Label>
                <Input
                  id="city"
                  value={deliveryAddress.city}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      city: e.target.value,
                    })
                  }
                  placeholder="İl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">İlçe</Label>
                <Input
                  id="district"
                  value={deliveryAddress.district}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      district: e.target.value,
                    })
                  }
                  placeholder="İlçe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Ülke</Label>
              <Input
                id="country"
                value={deliveryAddress.country}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    country: e.target.value,
                  })
                }
                placeholder="Ülke"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Devam Et</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as PaymentMethod)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="havale" id="havale" />
                <Label htmlFor="havale">Havale/EFT</Label>
              </div>
              {isInIstanbul && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kapidaodeme" id="kapidaodeme" />
                  <Label htmlFor="kapidaodeme">Kapıda Ödeme</Label>
                </div>
              )}
            </RadioGroup>

            {paymentMethod === "havale" && (
              <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium">Banka Hesap Bilgileri</h3>
                {BANK_ACCOUNTS.map((account, index) => (
                  <div
                    key={index}
                    className="space-y-2 border-b last:border-0 pb-2"
                  >
                    <div className="font-medium">{account.bank}</div>
                    <div className="text-sm">Şube: {account.branch}</div>
                    <div className="text-sm">
                      Hesap Sahibi: {account.accountHolder}
                    </div>
                    <div className="text-sm font-mono">{account.iban}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Ara Toplam</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Kargo Ücreti</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(shippingCost)}
                </span>
              </div>
              {hasDevice && isInIstanbul && (
                <div className="text-sm text-green-600">
                  * İstanbul içi ücretsiz cihaz kurulumu
                </div>
              )}
              {!isInTurkey ? (
                <div className="text-sm text-muted-foreground">
                  * Yurt dışı kargo ücreti: {SHIPPING_COST.INTERNATIONAL} TL
                </div>
              ) : !isInIstanbul ? (
                <div className="text-sm text-muted-foreground">
                  * Yurt içi kargo ücreti: {SHIPPING_COST.DOMESTIC} TL
                </div>
              ) : null}
              <div className="flex justify-between items-center font-bold pt-2">
                <span>Genel Toplam</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(finalTotal)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Geri
              </Button>
              <Button onClick={handlePaymentSubmit}>Siparişi Tamamla</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
