import Image from "next/image";
import { prisma } from "@/lib/db";
import { RentalCatalogueClient } from "@/components/public/RentalCatalogueClient";

export const metadata = {
  title: "Equipment Rental Catalogue | B.M Catering & Events Sri Lanka",
  description:
    "Browse our complete rental catalogue: Chiavari chairs, banquet tables, luxury marquees, stage platforms, food warmers, and soundproof generators.",
};

export const revalidate = 60;

export default async function RentalsPage() {
  const items = await prisma.inventoryItem.findMany({
    where: { status: { not: "RETIRED" } },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const categories = await prisma.inventoryCategory.findMany({
    orderBy: { name: "asc" },
  });

  const serializedItems = items.map((i) => ({
    id: i.id,
    name: i.name,
    sku: i.sku,
    description: i.description,
    imageUrl: i.imageUrl,
    totalQuantity: i.totalQuantity,
    availableQuantity: Math.max(0, i.totalQuantity - (i.damagedQuantity || 0) - (i.maintenanceQuantity || 0)),
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
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="relative py-14 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/PHOTO-2026-11-04-21-37-41.jpg"
            alt="B.M Catering Rental Inventory"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            B.M Catering Equipment Depots
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Event & Festival Rental Catalogue
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Select dates to check live inventory availability, choose your required quantities, and add items directly to your formal quotation request.
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
