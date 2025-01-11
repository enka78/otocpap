"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Örnek sipariş verileri
const orders = [
  {
    id: "1",
    date: "2024-01-15",
    total: 15000,
    status: "preparing", // hazırlanıyor
    items: [
      {
        title: "Philips DreamStation CPAP",
        quantity: 1,
        price: 15000,
      },
    ],
  },
  {
    id: "2",
    date: "2024-01-10",
    total: 5500,
    status: "shipped", // kargoya verildi
    items: [
      {
        title: "F&P Vitera Maske",
        quantity: 1,
        price: 3000,
      },
      {
        title: "Philips DreamStation Nemlendirici",
        quantity: 1,
        price: 2500,
      },
    ],
  },
  {
    id: "3",
    date: "2024-01-05",
    total: 18000,
    status: "delivered", // teslim edildi
    items: [
      {
        title: "ResMed AirSense 11",
        quantity: 1,
        price: 18000,
      },
    ],
  },
];

export default function OrdersPage() {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { currentLocale } = useSelector((state: RootState) => state.theme);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${currentLocale}/login`);
    }
  }, [isAuthenticated, router, currentLocale]);

  if (!isAuthenticated) {
    return null;
  }

  const handleCancelOrder = (orderId: string) => {
    // Burada API çağrısı yapılacak
    toast({
      title: "Başarılı",
      description: "Siparişiniz başarıyla iptal edildi.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge variant="secondary">Hazırlanıyor</Badge>;
      case "shipped":
        return <Badge variant="primary">Kargoya Verildi</Badge>;
      case "delivered":
        return <Badge variant="default">Teslim Edildi</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Siparişlerim</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tüm siparişlerinizi ve durumlarını buradan takip edebilirsiniz.
          </p>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Ürünler</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.title} x {item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(order.total)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.status === "preparing" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="text-xs"
                          >
                            İptal Et
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Siparişi İptal Et
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu siparişi iptal etmek istediğinizden emin
                              misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelOrder(order.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              İptal Et
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
