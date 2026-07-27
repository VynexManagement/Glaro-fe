import React from "react";
import { cn } from "./utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  subtitle,
  className,
  iconClassName,
  valueClassName,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.02)] transition-all duration-200 flex flex-col justify-between select-none",
        onClick && "cursor-pointer hover:shadow-md hover:border-indigo-100/60",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        {icon && (
          <div className={cn("w-10 h-10 rounded-xl bg-indigo-50/60 border border-indigo-100/40 flex items-center justify-center text-indigo-600 shrink-0", iconClassName)}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className={cn("text-3xl font-extrabold text-slate-900 tracking-tight", valueClassName)}>
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-md border",
                trendUp
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-red-50 text-red-700 border-red-100"
              )}
            >
              {trend}
            </span>
          )}
        </div>
        {subtitle && <p className="text-slate-400 text-xs font-semibold">{subtitle}</p>}
      </div>
    </div>
  );
}
