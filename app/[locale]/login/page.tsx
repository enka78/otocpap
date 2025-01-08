"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
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
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
          <p className="text-muted-foreground mt-2">
            Hesabınıza giriş yaparak alışverişe devam edin.
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Şifre
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Şifremi Unuttum
              </Link>
            </div>
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
            Giriş Yap
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Hesabınız yok mu? </span>
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
