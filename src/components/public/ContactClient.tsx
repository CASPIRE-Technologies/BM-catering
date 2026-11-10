"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building2,
  CheckCircle2,
} from "lucide-react";

export function ContactClient() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="relative py-14 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-47.jpg"
            alt="B.M Catering Office"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            {t.contactPage.kicker}
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            {t.contactPage.title}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-zinc-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gold-400" />
                <span>{t.contactPage.officeTitle}</span>
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">
                      {language === "si" ? "ලිපිනය" : "Central Address"}
                    </h5>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      {language === "si"
                        ? "නො. 88, නුවර පාර, පෑලියගොඩ / කොළඹ, ශ්‍රී ලංකාව"
                        : "No. 88, Kandy Road, Peliyagoda / Colombo, Sri Lanka"}
                    </p>
                    <p className="text-[11px] text-gold-400 mt-1">
                      {language === "si"
                        ? "(දිවයින පුරා බෙදාහැරීම සිදුකෙරේ)"
                        : "(Islandwide delivery available for all bookings)"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">{t.contactPage.phoneTitle}</h5>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Hotline: +94 77 123 4567<br />
                      Landline: +94 11 234 5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">{t.contactPage.emailTitle}</h5>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      info@bmcatering.lk<br />
                      events@bmcatering.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">{t.contactPage.hoursTitle}</h5>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {t.contactPage.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={`https://wa.me/94771234567?text=${encodeURIComponent(t.whatsapp.defaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.whatsapp.chat}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {t.contactPage.formTitle}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {t.contactPage.formSubtitle}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-300">
                    {t.contactPage.sentSuccess}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {language === "si"
                      ? "අපගේ විධායක නිලධාරියෙකු නුදුරේදීම ඔබ හා සම්බන්ධ වනු ඇත."
                      : "Our team has received your message and will reply via phone or email shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        {t.contactPage.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kasun Perera"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        {t.contactPage.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="077 123 4567"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        {t.contactPage.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="kasun@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        {t.contactPage.subjectLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t.contactPage.subjectPlaceholder}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      {t.contactPage.messageLabel} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contactPage.messagePlaceholder}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.contactPage.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Coverage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
                {language === "si" ? "ප්‍රවාහන සහ බෙදාහැරීමේ ජාලය" : "Strategic Logistics"}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                {language === "si" ? "දිවයින පුරා සේවා සැපයීම" : "Islandwide Service Network"}
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              {language === "si"
                ? "ප්‍රවාහන රථ සහ පළපුරුදු කාර්මික ශිල්පීන් සූදානමින්"
                : "Fleet of commercial transport trucks and setup technicians"}
            </div>
          </div>

          <div className="relative h-72 sm:h-96 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            <div className="text-center space-y-3 relative z-10 p-6">
              <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto shadow-gold">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                {language === "si"
                  ? "පෑලියගොඩ ප්‍රධාන ගබඩාව සහ මුළුතැන්ගෙවල්, කොළඹ"
                  : "Peliyagoda Central Depot & Kitchens, Colombo"}
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                {language === "si"
                  ? "කොළඹ, ගම්පහ, මීගමුව, කළුතර, නුවර, ගාල්ල සහ බස්නාහිර පළාත පුරා කඩිනම් ප්‍රවාහනය."
                  : "Rapid direct dispatch to Colombo, Gampaha, Negombo, Kalutara, Kandy, Galle, and throughout Sri Lanka."}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Colombo</span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Negombo</span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Kandy</span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Galle</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

