"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
  LayoutDashboard,
  Boxes,
  CalendarDays,
  Calendar,
  UtensilsCrossed,
  Sparkles,
  Users,
  CreditCard,
  Receipt,
  FileBarChart,
  Images,
  Globe,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: "/admin", label: t.admin.nav.dashboard, icon: LayoutDashboard },
    { href: "/admin/calendar", label: t.admin.nav.calendar, icon: Calendar },
    { href: "/admin/inventory", label: t.admin.nav.inventory, icon: Boxes },
    { href: "/admin/bookings", label: t.admin.nav.bookings, icon: CalendarDays },
    { href: "/admin/catering", label: t.admin.nav.catering, icon: UtensilsCrossed },
    { href: "/admin/lighting", label: t.admin.nav.lighting, icon: Sparkles },
    { href: "/admin/customers", label: t.admin.nav.customers, icon: Users },
    { href: "/admin/payments", label: t.admin.nav.payments, icon: CreditCard },
    { href: "/admin/expenses", label: t.admin.nav.expenses, icon: Receipt },
    { href: "/admin/reports", label: t.admin.nav.reports, icon: FileBarChart },
    { href: "/admin/gallery", label: t.admin.nav.gallery, icon: Images },
    { href: "/admin/content", label: t.admin.nav.content, icon: Globe },
    { href: "/admin/settings", label: t.admin.nav.settings, icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div>
              <img
                src="/images/bm-cook-catering-logo.png"
                alt="B.M Cook & Catering"
                className="w-[150px] h-auto object-contain"
              />
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold-500 font-semibold">
                {t.admin.portalSubtitle}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? "bg-gold-500/15 text-gold-300 font-semibold border border-gold-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-gold-400" : "text-zinc-500"
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-gold-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Link to Public Website */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-gold-300 hover:bg-zinc-900 transition border border-zinc-800"
          >
            <span>{t.admin.viewPublicSite}</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>
      </aside>
    </>
  );
}
