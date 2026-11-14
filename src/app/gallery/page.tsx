import Image from "next/image";
import { prisma } from "@/lib/db";
import { GalleryClient } from "@/components/public/GalleryClient";
import { fallbackGallery } from "@/lib/public-content";

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
  }) : fallbackGallery;

  return (
    <div className="site-light space-y-12 py-12">
      {/* Header */}
      <section className="page-hero relative py-20 sm:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-53.jpg"
            alt="B.M Catering Event Gallery"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            A little inspiration for your day
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Moments worth gathering for
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Explore the feeling we aim to create: generous food, thoughtful details and spaces that bring people closer.
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
