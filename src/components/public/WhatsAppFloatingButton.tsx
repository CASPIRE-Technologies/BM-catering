"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function WhatsAppFloatingButton() {
  const { t } = useLanguage();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "94771234567";
  const defaultMessage = encodeURIComponent(t.whatsapp.defaultMsg);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border border-emerald-400/30"
      aria-label={t.whatsapp.chat}
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
      </div>
      <div className="hidden sm:block text-left">
        <p className="text-xs text-emerald-100 font-medium leading-none">{t.whatsapp.support}</p>
        <p className="text-sm font-semibold tracking-wide">{t.whatsapp.chat}</p>
      </div>
    </a>
  );
}
