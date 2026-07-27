import React from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "./utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No Data Found",
  description = "We couldn't find any results matching your search or criteria.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-16 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm max-w-lg mx-auto select-none", className)}>
      <div className="flex justify-center mb-3">
        {icon || <HelpCircle className="w-12 h-12 text-slate-300" />}
      </div>
      <h3 className="font-bold text-slate-900 text-base">{title}</h3>
      {description && (
        <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
