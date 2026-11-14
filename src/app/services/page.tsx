import { prisma } from "@/lib/db";
import { ServicesClient } from "@/components/public/ServicesClient";
import { fallbackServices, loadPublicData } from "@/lib/public-content";

export const metadata = {
  title: "Our Services | B.M Catering & Luxury Event Services Sri Lanka",
  description:
    "Explore our full suite of event services: Wedding & corporate catering, marquee and chair rentals, and stage & fairy light decorations.",
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  const cateringServices = databaseConfigured
    ? await loadPublicData("catering services", () => prisma.service.findMany({
        where: { category: { slug: "catering" } },
        orderBy: { sortOrder: "asc" },
      }), fallbackServices.catering)
    : fallbackServices.catering;

  const rentalServices = databaseConfigured
    ? await loadPublicData("rental services", () => prisma.service.findMany({
        where: { category: { slug: "equipment-rentals" } },
        orderBy: { sortOrder: "asc" },
      }), fallbackServices.rentals)
    : fallbackServices.rentals;

  const lightingServices = databaseConfigured
    ? await loadPublicData("lighting services", () => prisma.service.findMany({
        where: { category: { slug: "lighting-decorations" } },
        orderBy: { sortOrder: "asc" },
      }), fallbackServices.lighting)
    : fallbackServices.lighting;

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
