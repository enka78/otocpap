"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const validatePassword = (password: string) => {
    if (password.length < 6 || password.length > 8) {
      return "Şifre 6-8 karakter uzunluğunda olmalıdır";
    }
    if (!/[A-Z]/.test(password)) {
      return "Şifre en az bir büyük harf içermelidir";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Şifre en az bir özel karakter içermelidir";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePassword(formData.password);
    if (error) {
      setPasswordError(error);
      return;
    }
    // Form submission logic will be added later
    console.log(formData);
  };

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Kayıt Ol</h1>
          <p className="text-muted-foreground mt-2">
            Hesap oluşturarak alışverişe başlayabilirsiniz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                Ad
              </label>
              <Input
                id="firstName"
                placeholder="Adınız"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Soyad
              </label>
              <Input
                id="lastName"
                placeholder="Soyadınız"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-posta
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefon
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="05XX XXX XX XX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Şifre
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                minLength={6}
                maxLength={8}
                className={passwordError ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Şifreniz 6-8 karakter uzunluğunda olmalı, en az bir büyük harf ve
              bir özel karakter içermelidir.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
}
