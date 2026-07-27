"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const widthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "md",
  className,
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={cn(
            "w-screen bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between animate-in slide-in-from-right duration-300",
            widthMap[width],
            className
          )}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              {typeof title === "string" ? (
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
              ) : (
                title
              )}
              {subtitle && <p className="text-xs text-slate-400 font-semibold mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
