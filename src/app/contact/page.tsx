import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  Building2,
  CalendarCheck,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | B.M Catering & Events Sri Lanka",
  description:
    "Reach out to B.M Catering for event consultations, tastings, warehouse inspections, and date bookings across Sri Lanka.",
};

export default function ContactPage() {
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
            We are here for you
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Connect With B.M Catering
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Reach out via phone, WhatsApp, or visit our central offices and equipment warehouse in Colombo.
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
                <span>Head Office & Warehouse</span>
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">Central Address</h5>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      No. 88, Kandy Road, Peliyagoda / Colombo, Sri Lanka
                    </p>
                    <p className="text-[11px] text-gold-400 mt-1">
                      (Islandwide delivery available for all bookings)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-200">Telephone Lines</h5>
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
                    <h5 className="font-semibold text-zinc-200">Email Enquiries</h5>
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
                    <h5 className="font-semibold text-zinc-200">Operating Hours</h5>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Monday – Sunday: 7:00 AM – 10:00 PM<br />
                      (24-Hour Emergency Event Dispatch)
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href="https://wa.me/94771234567?text=Hello%20B.M%20Catering!%20I%20would%20like%20to%20discuss%20an%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Have a general question, wish to inspect equipment at our depot, or want to arrange a food tasting session?
                </p>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruwan Silva"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="077 123 4567"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ruwan@example.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Food Tasting Session / Marquee Sizing"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your inquiry or question here..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps / Geographic Coverage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
                Strategic Logistics
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                Islandwide Service Network
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              Fleet of 4 commercial transport trucks and setup technicians
            </div>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="relative h-72 sm:h-96 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
            {/* Map graphics overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            <div className="text-center space-y-3 relative z-10 p-6">
              <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto shadow-gold">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                Peliyagoda Central Depot & Kitchens, Colombo
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Rapid direct dispatch to Colombo, Gampaha, Negombo, Kalutara, Kandy, Galle, and throughout the Western & Central Provinces.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Colombo 01–15</span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[11px] text-zinc-300 font-medium">Mount Lavinia</span>
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
