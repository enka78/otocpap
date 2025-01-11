"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { RootState } from "@/store";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  listView?: boolean;
  showPrice?: boolean;
}

export function ProductCard({
  product,
  listView = false,
  showPrice = false,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const whatsappNumber = "905532808273";
  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      toast({
        title: "Ürün zaten sepetinizde",
        description: "Bu ürün zaten sepetinizde bulunuyor.",
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    toast({
      title: "Ürün sepete eklendi",
      description: "Ürün başarıyla sepetinize eklendi.",
    });
  };

  const formattedPrice = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(product.price);

  return (
    <div
      className={`group relative rounded-lg border p-4 hover:border-primary transition-colors ${
        listView ? "flex gap-6" : ""
      }`}
    >
      <div className={listView ? "w-48 flex-shrink-0" : ""}>
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <h3 className="font-medium">{product.name}</h3>
        {showPrice && <div className="text-lg font-bold">{formattedPrice}</div>}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Detaylar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogDescription className="space-y-4 pt-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>{product.description}</p>
                  {showPrice && (
                    <div className="text-lg font-bold">{formattedPrice}</div>
                  )}
                  {showPrice && (
                    <div className="flex gap-2">
                      <Button onClick={handleAddToCart} className="flex-1">
                        Sepete Ekle
                      </Button>
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {showPrice ? (
            <Button onClick={handleAddToCart} size="sm">
              Sepete Ekle
            </Button>
          ) : (
            <Button
              onClick={() => window.open(whatsappUrl, "_blank")}
              size="sm"
            >
              Whatsapp ile iletişime geç
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
