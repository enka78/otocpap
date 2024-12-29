"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const t = useTranslations();
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);

  const categories = [
    { id: "cpap", label: "CPAP" },
    { id: "bipap", label: "BiPAP" },
    { id: "oxygen", label: t("products.oxygenConcentrator") },
    { id: "equipment", label: t("products.equipment") },
    { id: "supplies", label: t("products.supplies") },
  ];

  const brands = [
    { id: "philips", label: "Philips Respironics" },
    { id: "resmed", label: "ResMed" },
    { id: "fisher", label: "Fisher & Paykel" },
    { id: "devilbiss", label: "DeVilbiss" },
    { id: "inogen", label: "Inogen" },
  ];

  const handleCategoryChange = (checked: boolean, categoryId: string) => {
    // Implement category filter logic
  };

  const handleBrandChange = (checked: boolean, brandId: string) => {
    // Implement brand filter logic
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    // Implement price filter logic
  };

  return (
    <div className="w-[300px] space-y-4">
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>{t("filters.categories")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(checked as boolean, category.id)
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
          <AccordionTrigger>{t("filters.brands")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    onCheckedChange={(checked) =>
                      handleBrandChange(checked as boolean, brand.id)
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
    </div>
  );
}
