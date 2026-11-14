import Image from "next/image";
import { prisma } from "@/lib/db";
import { BookingEnquiryForm } from "@/components/public/BookingEnquiryForm";
import { loadPublicData } from "@/lib/public-content";

export const metadata = {
  title: "Book an Event | B.M Catering & Luxury Events Sri Lanka",
  description:
    "Submit your booking enquiry for wedding catering, party equipment rentals, and event lighting. Fast quotation delivery within 1 hour.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function BookPage() {
  const items = process.env.DATABASE_URL
    ? await loadPublicData("booking inventory", () => prisma.inventoryItem.findMany({
        where: { status: "AVAILABLE" },
        select: {
          id: true,
          name: true,
          sku: true,
          rentalPrice: true,
          imageUrl: true,
          category: { select: { name: true } },
        },
        orderBy: { name: "asc" },
      }), [])
    : [];

  const serializedItems = items.map((i) => ({
    ...i,
    rentalPrice: Number(i.rentalPrice),
  }));

  return (
    <div className="site-light space-y-12 py-12">
      {/* Header */}
      <section className="page-hero relative py-20 sm:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-27.jpg"
            alt="B.M Catering Booking"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 mx-auto rounded-full bg-[#DCEFE3] px-4 py-2 text-xs font-bold tracking-wide text-[#0E6049]">
            <span className="h-2 w-2 rounded-full bg-[#F4775D]" />
            Start with a few details
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-bold text-white tracking-tight">
            Booking Enquiry
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Tell us what you are planning. This enquiry form is ready for your next connection with the BM team.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-6 items-start">
          <aside className="rounded-[2rem] bg-[#0E6049] text-white p-8 sm:p-10 lg:sticky lg:top-28">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[0.95] font-bold">
              Let’s plan<br />something<br />lovely.
            </h2>
            <p className="mt-8 text-white/85 leading-relaxed">
              Send the basics and we can discuss the right menu, rental pieces and setup support for your occasion.
            </p>
            <ul className="mt-8 space-y-3 text-white/90">
              <li>• Weddings and homecomings</li>
              <li>• Family celebrations</li>
              <li>• Corporate gatherings</li>
              <li>• Festivals and outdoor events</li>
            </ul>
            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="font-bold">Prefer a quick call?</p>
              <a href="tel:+94771234567" className="mt-1 inline-block text-white/90">+94 77 123 4567</a>
            </div>
          </aside>
          <div className="booking-form-shell rounded-[2rem] bg-white border border-[#E3DCCC] p-3 sm:p-6 shadow-sm">
            <BookingEnquiryForm availableItems={serializedItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
