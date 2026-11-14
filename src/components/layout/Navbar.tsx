"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuotation } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { QuotationDrawer } from "@/components/public/QuotationDrawer";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  Sparkles,
  Lock,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItemCount } = useQuotation();
  const { t } = useLanguage();

  const isAdminSection = pathname.startsWith("/admin");
  if (isAdminSection) {
    // Admin uses its own dedicated sidebar & header layout
    return null;
  }

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/rentals", label: t.nav.rentals },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/book", label: t.nav.book },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-zinc-950 border-b border-zinc-900 py-2 px-4 text-xs text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F6C64D] animate-pulse"></span>
            <span className="truncate">{t.topBanner}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="tel:+94771234567"
              className="flex items-center gap-1.5 hover:text-[#F6C64D] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#F6C64D]" />
              <span>{t.phone}</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-white/75 hover:text-white transition"
            >
              <Lock className="w-3 h-3" />
              <span>{t.staffPortal}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className="sticky top-0 z-40 bg-[#FBF7ED]/95 backdrop-blur-md border-b border-[#E3DCCC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 grid grid-cols-1 lg:grid-cols-[minmax(250px,1fr)_auto_minmax(250px,1fr)] items-center gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center group text-[#14291F] min-w-0">
            <img
              src="/images/bm-cook-catering-logo.png"
              alt="BM Cook & Catering"
              className="w-[205px] sm:w-[245px] lg:w-[260px] h-auto object-contain object-left [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(20%)_saturate(950%)_hue-rotate(105deg)_brightness(88%)_contrast(94%)] transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition duration-200 relative py-1 ${
                    isActive
                      ? "text-[#0E6049] font-semibold"
                      : "text-[#536158] hover:text-[#0E6049]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4775D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:block"><LanguageSwitcher /></div>

            {/* Quotation Cart Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-white hover:bg-[#F1EBDD] text-[#14291F] border border-[#E3DCCC] hover:border-[#F4775D]/40 transition flex items-center gap-2 group"
              aria-label="View Quotation Request Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#0E6049] group-hover:scale-105 transition" />
              <span className="hidden sm:inline text-xs font-medium">{t.nav.quoteBtn}</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F6C64D] text-[#14291F] font-bold text-xs flex items-center justify-center animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <Link
              href="/book"
              className="hidden md:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold transition duration-200"
            >
              {t.nav.bookBtn}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-xs text-zinc-400 font-medium">Language / භාෂාව:</span>
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === link.href
                    ? "bg-gold-500/10 text-gold-400 font-semibold"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-gold-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl bg-gold-gradient text-zinc-950 font-bold text-sm uppercase tracking-wider"
              >
                {t.nav.bookBtn}
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-zinc-900 text-zinc-400 text-xs font-medium border border-zinc-800"
              >
                {t.staffPortal}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Slide-in Quotation Request Drawer */}
      <QuotationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
