"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid2X2, List } from "lucide-react";

interface ProductViewControlsProps {
  onViewChange: (view: "grid" | "list") => void;
  onGridSizeChange: (size: number) => void;
  onSortChange: (sort: string) => void;
}

export function ProductViewControls({
  onViewChange,
  onGridSizeChange,
  onSortChange,
}: ProductViewControlsProps) {
  const t = useTranslations();
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => handleViewChange("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => handleViewChange("list")}
        >
          <List className="h-4 w-4" />
        </Button>

        {view === "grid" && (
          <Select onValueChange={(value) => onGridSizeChange(Number(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t("products.gridSize")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">{t("products.threeColumns")}</SelectItem>
              <SelectItem value="5">{t("products.fiveColumns")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("products.sort")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priceAsc">{t("products.sortPriceAsc")}</SelectItem>
          <SelectItem value="priceDesc">
            {t("products.sortPriceDesc")}
          </SelectItem>
          <SelectItem value="newest">{t("products.sortNewest")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
