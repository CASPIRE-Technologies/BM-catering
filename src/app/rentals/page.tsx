import Image from "next/image";
import { prisma } from "@/lib/db";
import { RentalCatalogueClient } from "@/components/public/RentalCatalogueClient";
import { fallbackRentalItems } from "@/lib/public-content";

export const metadata = {
  title: "Equipment Rental Catalogue | B.M Catering & Events Sri Lanka",
  description:
    "Browse our complete rental catalogue: Chiavari chairs, banquet tables, luxury marquees, stage platforms, food warmers, and soundproof generators.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function RentalsPage() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const items = databaseConfigured ? await prisma.inventoryItem.findMany({
    where: { status: { not: "RETIRED" } },
    include: { category: true },
    orderBy: { name: "asc" },
  }) : fallbackRentalItems;

  const categories = databaseConfigured ? await prisma.inventoryCategory.findMany({
    orderBy: { name: "asc" },
  }) : fallbackRentalItems.map((item) => item.category);

  const serializedItems = items.map((i) => ({
    id: i.id,
    name: i.name,
    sku: i.sku,
    description: i.description,
    imageUrl: i.imageUrl,
    totalQuantity: i.totalQuantity,
    availableQuantity: "availableQuantity" in i
      ? i.availableQuantity
      : Math.max(0, i.totalQuantity - (i.damagedQuantity || 0) - (i.maintenanceQuantity || 0)),
    rentalPrice: Number(i.rentalPrice),
    pricingUnit: i.pricingUnit,
    condition: i.condition,
    category: {
      id: i.category.id,
      name: i.category.name,
      slug: i.category.slug,
    },
  }));

  return (
    <div className="site-light space-y-12 py-12">
      {/* Header */}
      <section className="page-hero relative py-20 sm:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-41.jpg"
            alt="B.M Catering Rental Inventory"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCEFE3] px-4 py-2 text-xs font-bold tracking-wide text-[#0E6049]">
              <span className="h-2 w-2 rounded-full bg-[#F4775D]" /> Build your event setup
            </span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Rental Catalogue
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Choose the practical pieces that make your venue feel ready, welcoming and beautifully put together.
          </p>
        </div>
      </section>

      {/* Interactive Catalogue Client Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RentalCatalogueClient
          initialItems={serializedItems}
          categories={categories}
        />
      </section>
    </div>
  );
}
