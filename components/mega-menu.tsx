"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  currentLocale: string;
  onClose: () => void;
  isMobile?: boolean;
}

export function MegaMenu({
  isOpen,
  currentLocale,
  onClose,
  isMobile = false,
}: MegaMenuProps) {
  const t = useTranslations();

  const categories = [
    {
      id: "cpap",
      title: t("categories.cpap"),
      description: t("categoryDescriptions.cpap"),
      image: "/images/cpap.jpg",
    },
    {
      id: "bipap",
      title: t("categories.bipap"),
      description: t("categoryDescriptions.bipap"),
      image: "/images/bipap.jpg",
    },
    {
      id: "masks",
      title: t("categories.masks"),
      description: t("categoryDescriptions.masks"),
      image: "/images/masks.jpg",
    },
    {
      id: "accessories",
      title: t("categories.accessories"),
      description: t("categoryDescriptions.accessories"),
      image: "/images/accessories.jpg",
    },
    {
      id: "oksijen-konsantratoru",
      title: t("categories.oxygen"),
      description: t("categoryDescriptions.oxygen"),
      image: "/images/oxygen.jpg",
    },
  ];

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <div className="px-4">
          <div className="flex justify-between items-center mb-4 py-4">
            <h2 className="text-lg font-bold">Kategoriler</h2>
            <button onClick={onClose} className="p-2">
              ×
            </button>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${currentLocale}/products?categories=${category.id}`}
                className="block p-4 rounded-lg hover:bg-accent transition-colors"
                onClick={onClose}
              >
                <h3 className="font-medium">{category.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-[70px] w-[800px] bg-background border rounded-lg shadow-lg p-6 z-[100]",
        "grid grid-cols-[300px_1fr] gap-6",
        "opacity-0 scale-95 transition-all duration-200",
        isOpen && "opacity-100 scale-100"
      )}
    >
      <div className="absolute -top-5 left-0 w-full h-5" />

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src="https://placehold.co/300x400"
          alt="Featured Product"
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${currentLocale}/products?categories=${category.id}`}
            className="group p-4 rounded-lg hover:bg-accent transition-colors"
            onClick={onClose}
          >
            <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
