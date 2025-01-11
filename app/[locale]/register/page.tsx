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

export default function RegisterPage() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        title: t("auth.register"),
        description: "Şifreler eşleşmiyor.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Burada normalde API'ye istek atılacak
      // Şimdilik dummy register yapıyoruz
      dispatch(
        login({
          id: "1",
          name: name,
          email: email,
        })
      );

      toast({
        title: t("auth.register"),
        description: t("auth.registerDescription"),
      });

      // Başarılı kayıttan sonra shop sayfasına yönlendir
      router.push(`/${currentLocale}/shop`);
    } catch (error) {
      toast({
        title: t("auth.register"),
        description: "Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin.",
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold">{t("auth.register")}</h1>
          <p className="text-muted-foreground">
            {t("auth.registerDescription")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("profile.fullName")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={t("profile.fullName")}
              required
            />
          </div>

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
            <Label htmlFor="password">{t("auth.newPassword")}</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t("auth.register")}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.haveAccount")}
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link href={`/${currentLocale}/login`}>
            <Button variant="outline" className="w-full">
              {t("auth.login")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
