"use client";

import React from "react";
import { Info } from "lucide-react";
import { cn } from "./utils";

export interface HoverTooltipProps {
  items: string[];
  countLabel?: string | number;
  className?: string;
  tooltipClassName?: string;
}

export function HoverTooltip({
  items,
  countLabel,
  className,
  tooltipClassName,
}: HoverTooltipProps) {
  if (!items || items.length === 0) return <span className="text-slate-400 text-xs">—</span>;

  return (
    <div className={cn("relative group inline-flex items-center gap-1.5 cursor-pointer select-none", className)}>
      <span className="text-slate-700 font-semibold text-xs">{countLabel ?? items.length}</span>
      <Info size={12} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />

      {/* Tooltip Content */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 mb-2 hidden group-hover:flex flex-col gap-1.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-50 min-w-[150px] max-w-[250px] transition-all duration-200 pointer-events-none",
          tooltipClassName
        )}
      >
        <div className="flex flex-wrap gap-1">
          {items.map((val, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-100 text-slate-500 border border-slate-200/20"
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
