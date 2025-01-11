"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormSkeleton } from "@/components/form-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentLocale } = useSelector((state: RootState) => state.theme);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login işlemi başarılı olduğunda
    dispatch(login());
    toast({
      title: t("auth.login"),
      description: t("auth.loginDescription"),
    });
    // Shop sayfasına yönlendir
    router.push(`/${currentLocale}/shop`);
  };

  if (isLoading) {
    return (
      <div className="container max-w-md py-16">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="container max-w-md py-16">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t("auth.login")}</h1>
          <p className="text-muted-foreground">{t("auth.loginDescription")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("profile.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@mail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.currentPassword")}</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">
            {t("auth.login")}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link
            href={`/${currentLocale}/forgot-password`}
            className="text-primary hover:underline"
          >
            {t("auth.forgotPassword")}
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.noAccount")}
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link href={`/${currentLocale}/register`}>
            <Button variant="outline" className="w-full">
              {t("auth.register")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
