"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
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
  const { t } = useLanguage();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/bm-cook-catering-logo.png"
                alt="B.M Cook & Catering"
                className="w-[230px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t.footer.bio}
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400/90 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.footer.halalCert}</span>
            </div>
          </div>

          {/* Col 2: Three Main Services */}
          <div>
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              {t.footer.coreServices}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#catering" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>{t.footer.service1}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#rentals" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>{t.footer.service2}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#lighting" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>{t.footer.service3}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>{t.footer.service4}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
              <li>
                <Link href="/services#cultural" className="hover:text-gold-300 transition flex items-center justify-between group">
                  <span>{t.footer.service5}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-300 transition">
                  {t.footer.linkHome}
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-gold-300 transition">
                  {t.footer.linkBook}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-300 transition">
                  {t.footer.linkGallery}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition">
                  {t.footer.linkContact}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold-300 transition">
                  {t.footer.linkStaff}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-zinc-100 mb-4">
              {t.footer.contactInfo}
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
          <p>© {new Date().getFullYear()} B.M Catering & Events Service. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-zinc-400">Help & Support</Link>
            <Link href="/admin/login" className="text-gold-500/80 hover:text-gold-400">{t.staffPortal}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
