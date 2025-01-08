"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations();
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset logic will be added later
    setIsSubmitted(true);
    console.log("Password reset requested for:", email);
  };

  if (isSubmitted) {
    return (
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">E-posta Gönderildi</h1>
            <p className="text-muted-foreground mt-4">
              Şifre yenileme bağlantısı e-posta adresinize gönderildi. Lütfen
              gelen kutunuzu kontrol edin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Şifremi Unuttum</h1>
          <p className="text-muted-foreground mt-2">
            Kayıtlı e-posta adresinizi girin, şifre yenileme bağlantısını
            gönderelim.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-posta
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Şifre Yenileme Bağlantısı Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
