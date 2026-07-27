"use client";

import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "./utils";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  loading = false,
}: ConfirmDialogProps) {
  const isDanger = variant === "danger";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-2",
              isDanger ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {confirmText}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4 pt-2">
        <div
          className={cn(
            "p-3 rounded-2xl shrink-0",
            isDanger ? "bg-red-50 text-red-600 border border-red-100" : "bg-amber-50 text-amber-600 border border-amber-100"
          )}
        >
          {isDanger ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-900 leading-snug">{title}</h4>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">{description}</p>
        </div>
      </div>
    </Modal>
  );
}
