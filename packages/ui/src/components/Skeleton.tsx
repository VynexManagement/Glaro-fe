import React from "react";
import { cn } from "./utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "custom";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-100 rounded-lg",
        variant === "text" && "h-4 w-full",
        variant === "card" && "bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm",
        variant === "circle" && "w-10 h-10 rounded-full",
        className
      )}
    />
  );
}

export function SkeletonCardGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-slate-100 rounded-lg" />
            <div className="h-5 w-16 bg-slate-100 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-50 rounded-lg" />
            <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
          </div>
          <div className="h-5 w-40 bg-slate-100 rounded-lg pt-2" />
        </div>
      ))}
    </div>
  );
}
