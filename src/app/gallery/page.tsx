import Image from "next/image";
import { prisma } from "@/lib/db";
import { GalleryClient } from "@/components/public/GalleryClient";

export const metadata = {
  title: "Event Gallery | B.M Catering & Events Sri Lanka",
  description:
    "Explore photographs of real weddings, banquets, marquee setups, and festival stage lighting executed by B.M Catering.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = process.env.DATABASE_URL ? await prisma.galleryImage.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  }) : [];

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="relative py-14 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-53.jpg"
            alt="B.M Catering Event Gallery"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            Visual Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Completed Event Highlights
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Every banquet, marquee canopy, and lighting installation represents our commitment to hospitality and perfection.
          </p>
        </div>
      </section>

      {/* Gallery Client Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryClient initialImages={images} />
      </section>
    </div>
  );
}
