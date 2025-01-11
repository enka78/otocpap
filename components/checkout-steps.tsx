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
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

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
} as const;

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
  const router = useRouter();
  const { currentLocale } = useSelector((state: RootState) => state.theme);

  // Teslimat konumu kontrolleri
  const isInIstanbul = ["istanbul", "İstanbul"].includes(
    deliveryAddress.city.trim()
  );
  const isInTurkey = deliveryAddress.country.toLowerCase() === "türkiye";

  // Cihaz satın alınıp alınmadığını kontrol et
  const hasDevice = cartItems.some((item) =>
    ["cpap", "bipap", "oksijen-konsantratoru"].includes(
      item.category.toLowerCase()
    )
  );

  // Kargo ücretini hesapla
  const calculateShippingCost = () => {
    if (!deliveryAddress.city || !deliveryAddress.country) return 0;

    // İstanbul içi kapıda ödeme için kargo ücreti yok
    if (isInIstanbul && paymentMethod === "kapidaodeme") {
      return 0;
    }

    // Yurt dışı kargo ücreti
    if (!isInTurkey) {
      return SHIPPING_COST.INTERNATIONAL;
    }

    // İstanbul dışı ve yurt içi kargo ücreti
    return SHIPPING_COST.DOMESTIC;
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
    // Sipariş oluştur
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      total: finalTotal,
      status: "preparing",
      items: cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Burada API çağrısı yapılacak ve sipariş kaydedilecek

    // Başarılı mesajı göster
    toast({
      title: "Başarılı",
      description: "Siparişiniz başarıyla oluşturuldu.",
    });

    // Sepeti temizle
    dispatch(clearCart());

    // Modal'ı kapat
    onClose();

    // Siparişlerim sayfasına yönlendir
    router.push(`/${currentLocale}/orders`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 md:p-6 md:gap-4">
        <DialogHeader className="p-4 border-b md:p-0 md:border-none">
          <DialogTitle className="text-lg font-semibold">
            {step === 1 ? "Teslimat Adresi" : "Ödeme Yöntemi"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 md:overflow-visible md:px-0 md:pb-0">
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
              <div className="space-y-4">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: PaymentMethod) =>
                    setPaymentMethod(value)
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="havale" id="havale" />
                    <Label
                      htmlFor="havale"
                      className="font-medium cursor-pointer flex-1"
                    >
                      Havale/EFT
                    </Label>
                  </div>
                  {isInIstanbul && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="kapidaodeme" id="kapidaodeme" />
                        <Label
                          htmlFor="kapidaodeme"
                          className="font-medium cursor-pointer flex-1"
                        >
                          İstanbul içi kapıda ödeme
                        </Label>
                      </div>
                      {paymentMethod === "kapidaodeme" && (
                        <div className="text-sm text-muted-foreground pl-4">
                          *İstanbul içi ücretsiz yerinde kurulum
                        </div>
                      )}
                    </div>
                  )}
                </RadioGroup>
              </div>

              {paymentMethod === "havale" && (
                <div className="space-y-2 border-t pt-4">
                  <h3 className="font-medium mb-3">
                    Havale / EFT Banka Bilgileri
                  </h3>
                  {BANK_ACCOUNTS.map((account, index) => (
                    <div key={index} className="space-y-1 text-sm">
                      <p className="font-medium">{account.bank}</p>
                      <p>Şube: {account.branch}</p>
                      <p>Hesap Sahibi: {account.accountHolder}</p>
                      <p className="font-mono select-all">{account.iban}</p>
                      {index !== BANK_ACCOUNTS.length - 1 && (
                        <hr className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 space-y-2">
                {!(isInIstanbul && paymentMethod === "kapidaodeme") && (
                  <div className="flex justify-between text-sm">
                    <span>Kargo</span>
                    <span>
                      {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      }).format(shippingCost)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Toplam</span>
                  <span>
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Geri
                </Button>
                <Button onClick={handlePaymentSubmit} className="flex-1">
                  Siparişi Tamamla
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
