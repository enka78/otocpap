"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  activeBrands: string[];
  activeCategories: string[];
}

const brands = [
  { id: "philips", label: "Philips Respironics" },
  { id: "resmed", label: "ResMed" },
  { id: "fisher", label: "Fisher & Paykel" },
  { id: "devilbiss", label: "DeVilbiss" },
  { id: "inogen", label: "Inogen" },
];

const categories = [
  { id: "cpap", label: "CPAP" },
  { id: "bipap", label: "BiPAP" },
  { id: "masks", label: "Maskeler" },
  { id: "accessories", label: "Aksesuarlar" },
  { id: "oksijen-konsantratoru", label: "Oksijen Konsantratörü" },
];

const priceRanges = {
  min: 0,
  max: 20000,
};

export function ProductFilters({
  activeBrands,
  activeCategories,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isShopPage = pathname.includes("/shop");
  const [priceRange, setPriceRange] = React.useState<number[]>([
    Number(searchParams.get("minPrice")) || priceRanges.min,
    Number(searchParams.get("maxPrice")) || priceRanges.max,
  ]);

  const updateFilters = (
    type: "brands" | "categories" | "price",
    value: string | number[],
    checked?: boolean
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (type === "price") {
      const [min, max] = value as number[];
      newSearchParams.set("minPrice", min.toString());
      newSearchParams.set("maxPrice", max.toString());
    } else {
      const currentValues =
        newSearchParams.get(type)?.split(",").filter(Boolean) || [];

      let newValues: string[];
      if (checked !== undefined) {
        if (checked) {
          newValues = [...currentValues, value as string];
        } else {
          newValues = currentValues.filter((v) => v !== value);
        }
      } else {
        newValues = currentValues;
      }

      if (newValues.length > 0) {
        newSearchParams.set(type, newValues.join(","));
      } else {
        newSearchParams.delete(type);
      }
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    updateFilters("brands", brandId, checked);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    updateFilters("categories", categoryId, checked);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters("price", value);
  };

  const clearFilters = () => {
    router.push(pathname);
    setPriceRange([priceRanges.min, priceRanges.max]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const defaultAccordionValues = ["categories", "brands"];
  if (isShopPage) {
    defaultAccordionValues.push("price");
  }

  return (
    <div className="w-full space-y-4">
      <Accordion type="multiple" defaultValue={defaultAccordionValues}>
        <AccordionItem value="categories">
          <AccordionTrigger>Kategoriler</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={activeCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Markalar</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={activeBrands.includes(brand.id)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {isShopPage && (
          <AccordionItem value="price">
            <AccordionTrigger>Fiyat Aralığı</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-2">
                <Slider
                  min={priceRanges.min}
                  max={priceRanges.max}
                  step={100}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mt-6"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm">{formatPrice(priceRange[0])}</span>
                  <span className="text-sm">{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {(activeBrands.length > 0 ||
        activeCategories.length > 0 ||
        (isShopPage &&
          (priceRange[0] !== priceRanges.min ||
            priceRange[1] !== priceRanges.max))) && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
}
