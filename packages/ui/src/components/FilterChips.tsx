"use client";

import React from "react";
import { cn } from "./utils";

export interface FilterChipsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
  chipClassName?: string;
  activeChipClassName?: string;
}

export function FilterChips({
  categories,
  activeCategory,
  onSelectCategory,
  className,
  chipClassName,
  activeChipClassName,
}: FilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2.5 pt-1", className)}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none",
              isActive
                ? cn("bg-indigo-600 border-indigo-700 text-white shadow-sm", activeChipClassName)
                : cn("bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300", chipClassName)
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
