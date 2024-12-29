"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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

export function ProductFilters({
  activeBrands,
  activeCategories,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (
    type: "brands" | "categories",
    value: string,
    checked: boolean
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const currentValues =
      newSearchParams.get(type)?.split(",").filter(Boolean) || [];

    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    if (newValues.length > 0) {
      newSearchParams.set(type, newValues.join(","));
    } else {
      newSearchParams.delete(type);
    }

    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    updateFilters("brands", brandId, checked);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    updateFilters("categories", categoryId, checked);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  return (
    <div className="w-full space-y-4">
      <Accordion type="multiple" defaultValue={["categories", "brands"]}>
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
      </Accordion>

      {(activeBrands.length > 0 || activeCategories.length > 0) && (
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
