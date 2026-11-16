"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut, ShieldCheck, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs text-zinc-400 font-medium">{t.admin.statusOperations}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Language Switcher for Admin */}
        <LanguageSwitcher />

        {/* User Info Badge */}
        <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
          <div className="w-6 h-6 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-zinc-200 leading-none">{t.admin.management}</p>
            <p className="text-[10px] text-gold-400 font-medium leading-none mt-1">{t.admin.superAdmin}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 transition flex items-center gap-1.5 text-xs font-medium"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">{t.admin.logout}</span>
        </button>
      </div>
    </header>
  );
}
