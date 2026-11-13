import { prisma } from "@/lib/db";
import { ServicesClient } from "@/components/public/ServicesClient";

export const metadata = {
  title: "Our Services | B.M Catering & Luxury Event Services Sri Lanka",
  description:
    "Explore our full suite of event services: Wedding & corporate catering, marquee and chair rentals, and stage & fairy light decorations.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const cateringServices = databaseConfigured ? await prisma.service.findMany({
    where: { category: { slug: "catering" } },
    orderBy: { sortOrder: "asc" },
  }) : [];

  const rentalServices = databaseConfigured ? await prisma.service.findMany({
    where: { category: { slug: "equipment-rentals" } },
    orderBy: { sortOrder: "asc" },
  }) : [];

  const lightingServices = databaseConfigured ? await prisma.service.findMany({
    where: { category: { slug: "lighting-decorations" } },
    orderBy: { sortOrder: "asc" },
  }) : [];

  // Serialize prices
  const serializedCatering = cateringServices.map((s) => ({
    ...s,
    basePrice: Number(s.basePrice),
  }));

  const serializedRentals = rentalServices.map((s) => ({
    ...s,
    basePrice: Number(s.basePrice),
  }));

  const serializedLighting = lightingServices.map((s) => ({
    ...s,
    basePrice: Number(s.basePrice),
  }));

  return (
    <ServicesClient
      cateringServices={serializedCatering}
      rentalServices={serializedRentals}
      lightingServices={serializedLighting}
    />
  );
}
