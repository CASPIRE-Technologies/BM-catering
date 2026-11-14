import { prisma } from "@/lib/db";
import { RentalCatalogueClient } from "@/components/public/RentalCatalogueClient";
import { fallbackRentalItems, loadPublicData } from "@/lib/public-content";

export const metadata = {
  title: "Equipment Rental Catalogue | B.M Catering & Events Sri Lanka",
  description:
    "Browse our complete rental catalogue: Chiavari chairs, banquet tables, luxury marquees, stage platforms, food warmers, and soundproof generators.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function RentalsPage() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const items = databaseConfigured
    ? await loadPublicData("rental inventory", () => prisma.inventoryItem.findMany({
        where: { status: { not: "RETIRED" } },
        include: { category: true },
        orderBy: { name: "asc" },
      }), fallbackRentalItems)
    : fallbackRentalItems;

  const categories = databaseConfigured
    ? await loadPublicData("rental categories", () => prisma.inventoryCategory.findMany({
        orderBy: { name: "asc" },
      }), fallbackRentalItems.map((item) => item.category))
    : fallbackRentalItems.map((item) => item.category);

  const serializedItems = items.map((i) => ({
    id: i.id,
    name: i.name,
    sku: i.sku,
    description: i.description,
    imageUrl: i.imageUrl,
    totalQuantity: i.totalQuantity,
    availableQuantity: "availableQuantity" in i
      ? Math.max(0, Number(i.availableQuantity))
      : Math.max(0, Number(i.totalQuantity) - Number(i.damagedQuantity || 0) - Number(i.maintenanceQuantity || 0)),
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
