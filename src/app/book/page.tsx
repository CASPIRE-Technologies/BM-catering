import Image from "next/image";
import { prisma } from "@/lib/db";
import { BookingEnquiryForm } from "@/components/public/BookingEnquiryForm";

export const metadata = {
  title: "Book an Event | B.M Catering & Luxury Events Sri Lanka",
  description:
    "Submit your booking enquiry for wedding catering, party equipment rentals, and event lighting. Fast quotation delivery within 1 hour.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function BookPage() {
  const items = process.env.DATABASE_URL ? await prisma.inventoryItem.findMany({
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
  }) : [];

  const serializedItems = items.map((i) => ({
    ...i,
    rentalPrice: Number(i.rentalPrice),
  }));

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="relative py-14 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-27.jpg"
            alt="B.M Catering Booking"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            Reserve Your Date
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Event Booking & Quotation Request
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Provide your event details below. Our planning team will verify date availability and send an official itemized quotation via WhatsApp and email.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingEnquiryForm availableItems={serializedItems} />
      </section>
    </div>
  );
}
