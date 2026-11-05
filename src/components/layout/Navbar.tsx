"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuotation } from "@/lib/cart-context";
import { QuotationDrawer } from "@/components/public/QuotationDrawer";
import {
  UtensilsCrossed,
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

  const isAdminSection = pathname.startsWith("/admin");
  if (isAdminSection) {
    // Admin uses its own dedicated sidebar & header layout
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/rentals", label: "Rental Catalogue" },
    { href: "/gallery", label: "Gallery" },
    { href: "/book", label: "Booking Enquiry" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-zinc-950 border-b border-zinc-900 py-1.5 px-4 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Now taking reservations for upcoming wedding & festival seasons across Sri Lanka</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="tel:+94771234567"
              className="flex items-center gap-1.5 hover:text-gold-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>+94 77 123 4567</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-amber-700 p-0.5 shadow-gold">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-gold-400 group-hover:scale-110 transition duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-zinc-100 group-hover:text-gold-300 transition">
                  B.M CATERING
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500/80 font-medium -mt-0.5">
                Luxury Events • Rentals • Decor
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition duration-200 relative py-1 ${
                    isActive
                      ? "text-gold-400 font-semibold"
                      : "text-zinc-300 hover:text-gold-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-amber-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quotation Cart Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-gold-500/40 transition flex items-center gap-2 group"
              aria-label="View Quotation Request Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 group-hover:scale-105 transition" />
              <span className="hidden sm:inline text-xs font-medium">Rental Quote</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-gradient text-zinc-950 font-bold text-xs flex items-center justify-center animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <Link
              href="/book"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold transition duration-200"
            >
              Book Event
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
                Request Event Quotation
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-zinc-900 text-zinc-400 text-xs font-medium border border-zinc-800"
              >
                Staff Portal Login
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
