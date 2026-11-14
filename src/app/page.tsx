import { prisma } from "@/lib/db";
import { HomeClient } from "@/components/public/HomeClient";
import { fallbackGallery, fallbackRentalItems, fallbackServices, loadPublicData } from "@/lib/public-content";

export const revalidate = 60; // ISR cache revalidation
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // The public site should still build/render when the database has not been
  // configured yet (for example, during the first Vercel deployment).
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const services = databaseConfigured
    ? await loadPublicData("home services", () => prisma.service.findMany({
        take: 3,
        orderBy: { sortOrder: "asc" },
      }), fallbackServices.catering)
    : fallbackServices.catering;

  const featuredRentals = databaseConfigured
    ? await loadPublicData("home rentals", () => prisma.inventoryItem.findMany({
        take: 4,
        where: { status: "AVAILABLE" },
        include: { category: true },
        orderBy: { totalQuantity: "desc" },
      }), fallbackRentalItems)
    : fallbackRentalItems;

  const galleryImages = databaseConfigured
    ? await loadPublicData("home gallery", () => prisma.galleryImage.findMany({
        take: 6,
        where: { featured: true },
        orderBy: { sortOrder: "asc" },
      }), fallbackGallery)
    : fallbackGallery;

  const serializedRentals = featuredRentals.map((item) => ({
    ...item,
    rentalPrice: Number(item.rentalPrice),
  }));

  return (
    <HomeClient
      services={services}
      featuredRentals={serializedRentals}
      galleryImages={galleryImages}
    />
  );
}
