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
      className={`inline-flex items-center p-0.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
          language === "en"
            ? "bg-gradient-to-r from-[#A6B9BE] to-[#D8D2C6] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
        title="Switch to English"
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold">EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("si")}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
          language === "si"
            ? "bg-gradient-to-r from-[#A6B9BE] to-[#D8D2C6] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
        title="සිංහල භාෂාවට මාරු වන්න"
      >
        <span className="text-xs font-semibold">සිංහල</span>
      </button>
    </div>
  );
}

