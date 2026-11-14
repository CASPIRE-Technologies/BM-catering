"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "dropdown" | "simple";
}

export function LanguageSwitcher({ className = "", variant = "pill" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-white/90 border border-[#E3DCCC] shadow-sm text-xs font-medium ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
          language === "en"
            ? "bg-[#0E6049] text-white font-bold shadow-sm"
            : "text-[#536158] hover:text-[#0E6049]"
        }`}
        title="Switch to English"
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold">EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("si")}
        className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
          language === "si"
            ? "bg-[#0E6049] text-white font-bold shadow-sm"
            : "text-[#536158] hover:text-[#0E6049]"
        }`}
        title="සිංහල භාෂාවට මාරු වන්න"
      >
        <span className="text-[11px] font-semibold">සිංහල</span>
      </button>
    </div>
  );
}

