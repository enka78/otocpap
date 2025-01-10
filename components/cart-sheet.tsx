"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { CheckoutSteps } from "./checkout-steps";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Maske ve Aksesuar kategorileri için miktar kontrolü
const isMultiPurchaseCategory = (category: string) => {
  return ["masks", "accessories"].includes(category.toLowerCase());
};

export function CartSheet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  // Sadece shop sayfasında ve kullanıcı giriş yapmışsa göster
  const isShopPage = pathname === "/shop" || pathname?.endsWith("/shop");
  if (!isAuthenticated || !isShopPage) {
    return null;
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  const handleCartClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(totalPrice);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Sepetim</SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Sepetiniz boş
              </div>
            ) : (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">
                        {new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        }).format(item.price)}
                      </div>
                      <div className="flex items-center gap-2">
                        {isMultiPurchaseCategory(item.category) ? (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Miktar: 1
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Toplam</span>
                    <span className="font-bold">{formattedTotalPrice}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Satın Al
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutSteps
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalPrice={totalPrice}
        cartItems={cartItems}
      />
    </>
  );
}
