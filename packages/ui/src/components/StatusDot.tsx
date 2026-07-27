import React from "react";
import { cn } from "./utils";

export type StatusDotVariant = "emerald" | "amber" | "red" | "slate" | "indigo";

export interface StatusDotProps {
  variant?: StatusDotVariant;
  pulse?: boolean;
  className?: string;
  size?: "sm" | "md";
}

const colorMap: Record<StatusDotVariant, string> = {
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  slate: "bg-slate-400",
  indigo: "bg-indigo-500",
};

export function StatusDot({
  variant = "emerald",
  pulse = false,
  className,
  size = "sm",
}: StatusDotProps) {
  const sizeClass = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span className="relative flex items-center shrink-0">
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
            colorMap[variant]
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-block rounded-full shadow-sm",
          sizeClass,
          colorMap[variant],
          className
        )}
      />
    </span>
  );
}
