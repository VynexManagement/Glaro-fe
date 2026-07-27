import React from "react";
import { cn } from "./utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  statusDot?: boolean;
  actions?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  statusDot,
  actions,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between border-b border-slate-100 pb-4 mb-6", className)}>
      <div className="flex items-center gap-3">
        {icon && <span className="shrink-0">{icon}</span>}
        <div>
          <div className="flex items-center gap-2">
            <h2 className={cn("text-base font-bold text-slate-900 leading-none", titleClassName)}>
              {title}
            </h2>
            {statusDot && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />}
          </div>
          {subtitle && (
            <p className="text-slate-400 text-[11px] mt-1 font-semibold uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
