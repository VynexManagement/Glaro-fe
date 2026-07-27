import React from "react";
import { cn } from "./utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
  className,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4", className)}>
      <div className="space-y-1">
        <h1 className={cn("text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5", titleClassName)}>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{title}</span>
        </h1>
        {description && (
          <p className={cn("text-slate-500 text-sm max-w-3xl leading-relaxed font-medium", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
