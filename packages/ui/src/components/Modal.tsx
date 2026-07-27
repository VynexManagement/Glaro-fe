"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";
  className?: string;
  bodyClassName?: string;
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  full: "max-w-full mx-4",
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "2xl",
  className,
  bodyClassName,
}: ModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200",
          maxWidthMap[maxWidth],
          className
        )}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
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
        )}

        {/* Content Body */}
        <div className={cn("p-6 overflow-y-auto flex-1 space-y-4", bodyClassName)}>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
