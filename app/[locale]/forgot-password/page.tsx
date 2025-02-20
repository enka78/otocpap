"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const { currentLocale } = useSelector((state: RootState) => state.theme);
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset logic will be added later
    setIsSubmitted(true);
    toast({
      title: t("auth.resetPasswordSuccess"),
      description: t("auth.resetPasswordSuccessDescription"),
    });
    console.log("Password reset requested for:", email);
  };

  if (isSubmitted) {
    return (
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {t("auth.resetPasswordSuccess")}
            </h1>
            <p className="text-muted-foreground mt-4">
              {t("auth.resetPasswordSuccessDescription")}
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
          <h1 className="text-2xl font-bold">{t("auth.resetPassword")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("auth.resetPasswordDescription")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("profile.email")}
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
            {t("auth.resetPasswordButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}
