import { prisma } from "@/lib/db";
import { HomeClient } from "@/components/public/HomeClient";

export const revalidate = 60; // ISR cache revalidation
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // The public site should still build/render when the database has not been
  // configured yet (for example, during the first Vercel deployment).
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const services = databaseConfigured ? await prisma.service.findMany({
    take: 3,
    orderBy: { sortOrder: "asc" },
  }) : [];

  const featuredRentals = databaseConfigured ? await prisma.inventoryItem.findMany({
    take: 4,
    where: { status: "AVAILABLE" },
    include: { category: true },
    orderBy: { totalQuantity: "desc" },
  }) : [];

  const galleryImages = databaseConfigured ? await prisma.galleryImage.findMany({
    take: 6,
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  }) : [];

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
