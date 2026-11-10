"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { formatCurrency } from "@/lib/utils";
import {
  UtensilsCrossed,
  Tent,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";

interface HomeClientProps {
  services: any[];
  featuredRentals: any[];
  galleryImages: any[];
}

export function HomeClient({ services, featuredRentals, galleryImages }: HomeClientProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/catering-hero.png"
            alt="Elegant catered wedding banquet with plated dishes and warm evening lighting"
            fill
            priority
            className="object-cover brightness-[0.5] scale-105 transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/55 via-transparent to-[#09090b]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>{t.hero.trustBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.2]">
            {t.hero.titlePre} <span className="text-gold-gradient">{t.hero.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold-lg transition flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.bookCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/rentals"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wider bg-zinc-900/90 text-zinc-100 hover:text-gold-300 border border-zinc-700/80 hover:border-gold-500/50 backdrop-blur-md transition flex items-center justify-center gap-2"
            >
              <Tent className="w-4 h-4 text-gold-400" />
              <span>{t.hero.rentalsCta}</span>
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-zinc-800/80">
            <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {t.hero.stats.yearsVal}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                {t.hero.stats.yearsLabel}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {t.hero.stats.eventsVal}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                {t.hero.stats.eventsLabel}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {t.hero.stats.halalVal}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                {t.hero.stats.halalLabel}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {t.hero.stats.quoteVal}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                {t.hero.stats.quoteLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              <Award className="w-4 h-4" />
              <span>{language === "si" ? "බී.එම්. කේටරින් පිළිබඳව" : "About B.M Catering & Events"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100 leading-tight">
              {language === "si"
                ? "ආගන්තුක සත්කාරය, ප්‍රණීත ආහාර සහ විශිෂ්ට උත්සව සැලසුම්කරණය"
                : "A Legacy of Hospitality, Culinary Mastery & Flawless Execution"}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              {language === "si"
                ? "ප්‍රණීත ආහාර පාන සහ මනරම් උත්සව සැකසුම් කෙරෙහි ඇති උනන්දුව මත ඇරඹි B.M Catering අද වන විට ශ්‍රී ලංකාවේ ප්‍රමුඛතම පූර්ණ-සේවා උත්සව සහකරුවෙකු බවට පත්ව ඇත. ඔබ සංවිධානය කරන්නේ කුඩා පෞද්ගලික උත්සවයක්, එළිමහන් මංගල උත්සවයක් හෝ දැවැන්ත ව්‍යාපාරික සමුළුවක් වුවද, අපි උපරිම විශ්වාසනීයත්වයෙන් සේවය සපයන්නෙමු."
                : "Founded with a passion for authentic flavors and sophisticated event setups, B.M Catering has become one of Sri Lanka’s most trusted full-service event partners. Whether you are hosting an intimate home celebration, an outdoor tropical wedding, or a grand corporate summit, we deliver complete peace of mind."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {language === "si" ? "නැවුම් හා ප්‍රණීත ආහාර" : "Authentic Recipes & Fresh Food"}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {language === "si" ? "උසස් අමුද්‍රව්‍ය යොදාගනිමින් සජීවීව පිසිනු ලැබේ." : "Cooked fresh on-site with premium ingredients."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {language === "si" ? "ස්වයංක්‍රීය උපකරණ සංචිතය" : "Complete Event Infrastructure"}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {language === "si" ? "මැදිහත්කරුවන්ගෙන් තොරව අපගේම කූඩාරම්, පුටු සහ මේස." : "We own our marquees, generators, chairs, and tables."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {language === "si" ? "පළපුරුදු සත්කාරක කාර්ය මණ්ඩලය" : "Experienced Crew & Stewards"}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {language === "si" ? "විනයගරුක සහ ආචාරශීලී කාර්ය මණ්ඩල සේවය." : "Polite, uniformed staff to serve your guests."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {language === "si" ? "දිවයින පුරා බෙදාහැරීම" : "Islandwide Logistics"}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {language === "si" ? "නියමිත වේලාවට ප්‍රවාහනය සහ කඩිනම් සවිකිරීම." : "Prompt delivery and on-time setup across Sri Lanka."}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm group"
              >
                <span>{language === "si" ? "අපගේ සම්පූර්ණ සේවා පරාසය බලන්න" : "Discover our full services range"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase collage using real photos */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/real/PHOTO-2026-11-04-21-37-47.jpg"
                  alt="Chafing dish setup"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/real/PHOTO-2026-11-04-21-37-29.jpg"
                  alt="Chiavari chairs setup"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/real/PHOTO-2026-11-04-21-37-41.jpg"
                  alt="Marquee tent setup"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/real/PHOTO-2026-11-04-21-37-53.jpg"
                  alt="Fairy lights illumination"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE MAIN SERVICE CATEGORIES */}
      <section className="bg-zinc-950/60 py-20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              {t.servicesSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-100">
              {t.servicesSection.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              {t.servicesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Catering */}
            <div className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/50 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition">
                  <UtensilsCrossed className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {t.servicesSection.service1.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.servicesSection.service1.desc}
                </p>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service1.bullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service1.bullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service1.bullet3}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6">
                <Link
                  href="/services#catering"
                  className="text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 group-hover:translate-x-1 transition"
                >
                  <span>{t.servicesSection.service1.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Rentals */}
            <div className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/50 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition">
                  <Tent className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {t.servicesSection.service2.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.servicesSection.service2.desc}
                </p>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service2.bullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service2.bullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service2.bullet3}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6">
                <Link
                  href="/rentals"
                  className="text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 group-hover:translate-x-1 transition"
                >
                  <span>{t.servicesSection.service2.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Lighting & Decor */}
            <div className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/50 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {t.servicesSection.service3.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t.servicesSection.service3.desc}
                </p>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service3.bullet1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service3.bullet2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{t.servicesSection.service3.bullet3}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6">
                <Link
                  href="/services#lighting"
                  className="text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 group-hover:translate-x-1 transition"
                >
                  <span>{t.servicesSection.service3.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED RENTAL EQUIPMENT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              {t.featuredRentals.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
              {t.featuredRentals.title}
            </h2>
            <p className="text-zinc-400 text-sm">
              {t.featuredRentals.subtitle}
            </p>
          </div>
          <Link
            href="/rentals"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-zinc-900 hover:bg-zinc-800 text-gold-400 border border-zinc-800 hover:border-gold-500/40 transition"
          >
            <span>{t.featuredRentals.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRentals.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-gold-500/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-52 bg-zinc-800 overflow-hidden">
                <Image
                  src={item.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-gold-400 border border-zinc-800">
                  {item.category?.name || "Equipment"}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-zinc-100 group-hover:text-gold-300 transition line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      {t.featuredRentals.perDay}
                    </span>
                    <span className="text-base font-serif font-bold text-gold-300">
                      {formatCurrency(item.rentalPrice)}
                    </span>
                  </div>
                  <Link
                    href={`/rentals?item=${item.id}`}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-gold-500 hover:text-black text-xs font-semibold text-zinc-200 transition"
                  >
                    {language === "si" ? "විස්තර" : "Details"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PREVIOUS EVENT HIGHLIGHTS GALLERY */}
      <section className="bg-zinc-950/70 py-20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              {t.gallerySection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
              {t.gallerySection.title}
            </h2>
            <p className="text-zinc-400 text-sm">
              {t.gallerySection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                      {img.category}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white mt-0.5">
                      {img.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold transition"
            >
              <span>{t.gallerySection.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            {t.whyUs.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
            {t.whyUs.title}
          </h2>
          <p className="text-zinc-400 text-sm">
            {t.whyUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-100">{t.whyUs.feature1Title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.whyUs.feature1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
              <Tent className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-100">{t.whyUs.feature2Title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.whyUs.feature2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-100">{t.whyUs.feature3Title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.whyUs.feature3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-100">{t.whyUs.feature4Title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.whyUs.feature4Desc}</p>
          </div>
        </div>
      </section>

      {/* 7. WHATSAPP & DIRECT ENQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-gold-500/30 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{language === "si" ? "පැය 24 පුරා වට්ස්ඇප් සේවය" : "Direct WhatsApp Inquiry Available 24/7"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white max-w-3xl mx-auto">
            {t.ctaBanner.title}
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base font-light">
            {t.ctaBanner.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/94771234567?text=Hello%20B.M%20Catering!%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.ctaBanner.whatsapp}</span>
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-gold-gradient text-zinc-950 hover:brightness-110 shadow-gold transition flex items-center justify-center gap-2"
            >
              <span>{t.ctaBanner.bookOnline}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

