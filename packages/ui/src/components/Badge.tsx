import React from "react";
import { cn } from "./utils";

export type BadgeVariant = "indigo" | "emerald" | "amber" | "red" | "purple" | "slate" | "blue";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  uppercase?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  red: "bg-red-50 text-red-700 border-red-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  slate: "bg-slate-50 text-slate-600 border-slate-200/60",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
};

export function Badge({
  children,
  variant = "indigo",
  size = "sm",
  uppercase = true,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold border rounded-full tracking-wider transition-colors",
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        uppercase && "uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
