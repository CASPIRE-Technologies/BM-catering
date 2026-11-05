"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-700 p-0.5">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-gold-400" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-zinc-100">
                  B.M CATERING
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500">
                  Luxury Events & Rentals
                </p>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Sri Lanka&apos;s premier event partner offering gourmet banquet catering, luxury marquees, furniture rentals, and enchanting lighting design for memorable occasions.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400/90 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Halal Certified • Registered Sri Lankan Business</span>
            </div>
          </div>

          {/* Col 2: Three Main Services */}
          <div>
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Our Core Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#catering" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>Banquet & Wedding Catering</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#rentals" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>Marquee, Chair & Stage Rentals</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#lighting" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>Fairy Lights & Stage Illumination</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>Equipment Rental Catalogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#cultural" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>Traditional Festivals & Feasts</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/book" className="hover:text-gold-300 transition">
                  Book an Event Online
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-300 transition">
                  Completed Event Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition">
                  Contact & Office Location
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold-300 transition">
                  Management Dashboard Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4">
              Get in Touch
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gold-400 mt-1 shrink-0" />
              <span>Colombo & Western Province Coverage (Islandwide delivery for large events)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <a href="tel:+94771234567" className="hover:text-gold-300 transition">
                +94 77 123 4567 / +94 11 234 5678
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href="mailto:info@bmcatering.lk" className="hover:text-gold-300 transition">
                info@bmcatering.lk
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Mon - Sun: 7:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} B.M Catering & Events Service. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-400">Rental Terms</Link>
            <Link href="/admin/login" className="text-gold-500/80 hover:text-gold-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
