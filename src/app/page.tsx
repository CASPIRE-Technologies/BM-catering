import { prisma } from "@/lib/db";
import { HomeClient } from "@/components/public/HomeClient";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // Fetch featured services, items, and gallery
  const services = await prisma.service.findMany({
    take: 3,
    orderBy: { sortOrder: "asc" },
  });

  const featuredRentals = await prisma.inventoryItem.findMany({
    take: 4,
    where: { status: "AVAILABLE" },
    include: { category: true },
    orderBy: { totalQuantity: "desc" },
  });

  const galleryImages = await prisma.galleryImage.findMany({
    take: 6,
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });

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
