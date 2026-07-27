import React from "react";
import { cn } from "./utils";

export interface DataCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function DataCard({
  children,
  header,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  hoverEffect = true,
  onClick,
}: DataCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-200",
        hoverEffect && "hover:shadow-md hover:border-indigo-100/70",
        onClick && "cursor-pointer",
        className
      )}
    >
      {header && <div className={cn("border-b border-slate-100 pb-4 mb-4", headerClassName)}>{header}</div>}
      <div className={cn("flex-1 space-y-3", bodyClassName)}>{children}</div>
      {footer && <div className={cn("border-t border-slate-100 pt-4 mt-4", footerClassName)}>{footer}</div>}
    </div>
  );
}
