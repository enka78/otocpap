"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const t = useTranslations();

  return (
    <section className="py-8 md:py-16 bg-primary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("newsletter.title")}
          </h2>
          <p className="text-sm md:text-base text-white/90 mb-6 max-w-lg">
            {t("newsletter.description")}
          </p>
          <form className="w-full max-w-sm flex flex-col md:flex-row gap-3">
            <Input
              type="email"
              placeholder={t("newsletter.emailPlaceholder")}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button
              variant="secondary"
              type="submit"
              className="w-full md:w-auto"
            >
              {t("newsletter.subscribe")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
