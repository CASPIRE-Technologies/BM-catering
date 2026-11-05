import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Tent,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  CalendarDays,
  ShieldCheck,
  Flame,
  Award,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Our Services | B.M Catering & Luxury Event Services Sri Lanka",
  description:
    "Explore our full suite of event services: Wedding & corporate catering, marquee and chair rentals, and stage & fairy light decorations.",
};

export default async function ServicesPage() {
  const cateringServices = await prisma.service.findMany({
    where: { category: { slug: "catering" } },
    orderBy: { sortOrder: "asc" },
  });

  const rentalServices = await prisma.service.findMany({
    where: { category: { slug: "equipment-rentals" } },
    orderBy: { sortOrder: "asc" },
  });

  const lightingServices = await prisma.service.findMany({
    where: { category: { slug: "lighting-decorations" } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-24 py-12">
      {/* Page Header Banner */}
      <section className="relative py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-27.jpg"
            alt="B.M Catering Services"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            B.M Catering Experience
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Comprehensive Event Services
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base">
            Gourmet culinary banquets, certified event infrastructure rentals, and artistic lighting designs orchestrated to flawless standards across Sri Lanka.
          </p>

          {/* Quick jump navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <a
              href="#catering"
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-gold-500/20 text-xs font-semibold text-zinc-300 hover:text-gold-300 border border-zinc-800 transition flex items-center gap-2"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-gold-400" />
              <span>1. Catering Services</span>
            </a>
            <a
              href="#rentals"
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-gold-500/20 text-xs font-semibold text-zinc-300 hover:text-gold-300 border border-zinc-800 transition flex items-center gap-2"
            >
              <Tent className="w-3.5 h-3.5 text-gold-400" />
              <span>2. Equipment Rentals</span>
            </a>
            <a
              href="#lighting"
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-gold-500/20 text-xs font-semibold text-zinc-300 hover:text-gold-300 border border-zinc-800 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>3. Lighting & Decor</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: CATERING SERVICES */}
      <section id="catering" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Department 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
              Gourmet Catering Services
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We prepare authentic Sri Lankan feasts, international buffets, and dynamic live action cooking stations with pristine hygiene and 100% Halal certification.
            </p>
          </div>
          <Link
            href="/book?service=catering"
            className="px-6 py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition self-start md:self-auto shrink-0"
          >
            Inquire Catering Date
          </Link>
        </div>

        {/* Detailed Catering Sub-Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cateringServices.map((service) => {
            let features: string[] = [];
            try {
              if (service.features) features = JSON.parse(service.features);
            } catch {
              features = [service.features || ""];
            }

            return (
              <div
                key={service.id}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 bg-zinc-800 overflow-hidden">
                  <Image
                    src={service.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-27.jpg"}
                    alt={service.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif font-bold text-gold-300 border border-zinc-700">
                    From {formatCurrency(service.basePrice)} / person
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-zinc-100">
                      {service.name}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 block">
                      Package Inclusions:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-zinc-300">
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Live action counters available</span>
                    <Link
                      href={`/book?package=${service.slug}`}
                      className="text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                    >
                      <span>Customise This Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: EQUIPMENT RENTALS */}
      <section id="rentals" className="bg-zinc-950/80 py-20 border-y border-zinc-900 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
                <Tent className="w-4 h-4" />
                <span>Department 02</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
                Event & Festival Equipment Rentals
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Pristine furniture, modular stages, luxury weatherproof marquees, commercial catering warmers, and festival power generation. Real-time date availability checking.
              </p>
            </div>
            <Link
              href="/rentals"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition self-start md:self-auto shrink-0"
            >
              Open Full Rental Catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">01</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Chairs & Seating</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Chiavari chairs (Gold, White, Mahogany), luxury padded banquet chairs with satin tie-backs, VIP sofas, and outdoor garden seating.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">02</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Tables & Dining</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                6ft Round 10-seater tables, 6ft & 8ft buffet service tables, high cocktail cocktail tables, cake presentation tables with linens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">03</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Tents & Marquees</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Galvanized waterproof marquees (up to 500 pax), pyramid canopies, gazebo stalls, and climate-controlled enclosed tent setups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">04</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Stages & Trussing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Modular elevated stages (adjustable height from 1ft to 4ft), heavy-duty carpeting, red carpets, aluminum truss arches, and backdrop frames.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">05</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Catering Equipment</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Roll-top stainless steel chafing warmers, refrigerated drink dispensers, luxury cutlery, glassware sets, water boilers, and trays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <span className="font-serif font-bold">06</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-zinc-100">Festival Power & Cooling</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Soundproof silent 45kVA & 60kVA diesel generators, automatic transfer switches, high-volume misting fans, and crowd barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LIGHTING & DECORATIONS */}
      <section id="lighting" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Department 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-100">
              Lighting & Event Decorations
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Illuminating emotions through professional lighting design — fairy light canopies, moving beam concerts, crystal chandeliers, floral arches, and thematic wedding mandaps.
            </p>
          </div>
          <Link
            href="/book?service=lighting"
            className="px-6 py-3 rounded-xl bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition self-start md:self-auto shrink-0"
          >
            Design My Event Lighting
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lightingServices.map((service) => {
            let features: string[] = [];
            try {
              if (service.features) features = JSON.parse(service.features);
            } catch {
              features = [service.features || ""];
            }

            return (
              <div
                key={service.id}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 bg-zinc-800 overflow-hidden">
                  <Image
                    src={service.imageUrl || "/images/real/PHOTO-2026-11-04-21-37-49.jpg"}
                    alt={service.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif font-bold text-gold-300 border border-zinc-700">
                    From {formatCurrency(service.basePrice)} / event
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-zinc-100">
                      {service.name}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 block">
                      Production Specs:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-zinc-300">
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Includes technician & operator</span>
                    <Link
                      href={`/book?package=${service.slug}`}
                      className="text-xs uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                    >
                      <span>Request Lighting Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
