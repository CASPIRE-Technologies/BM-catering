import { prisma } from "./db";

export interface ItemAvailability {
  itemId: string;
  name: string;
  sku: string;
  totalQuantity: number;
  bookedQuantity: number;
  maintenanceQuantity: number;
  damagedQuantity: number;
  availableQuantity: number;
  isAvailable: boolean;
  rentalPrice: number;
  pricingUnit: string;
}

/**
 * Calculates item availability for a given date range.
 * Considers overlapping active/confirmed bookings, maintenance records, and damaged quantities.
 */
export async function checkItemAvailability(
  itemId: string,
  startDate: Date,
  endDate: Date,
  requestedQuantity: number = 1,
  excludeBookingId?: string
): Promise<ItemAvailability> {
  const item = await prisma.inventoryItem.findUnique({
    where: { id: itemId },
    include: {
      category: true,
    },
  });

  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }

  // 1. Overlapping bookings where status is not CANCELLED
  // Overlap condition: booking.startDate <= query.endDate AND booking.endDate >= query.startDate
  const overlappingBookings = await prisma.bookingItem.findMany({
    where: {
      itemId: item.id,
      booking: {
        id: excludeBookingId ? { not: excludeBookingId } : undefined,
        status: {
          notIn: ["CANCELLED"],
        },
        startDate: { lte: endDate },
        endDate: { gte: startDate },
      },
    },
    select: {
      quantity: true,
      bookingId: true,
    },
  });

  const bookedQuantity = overlappingBookings.reduce((sum, bi) => sum + bi.quantity, 0);

  // 2. Active maintenance during the period
  const activeMaintenance = await prisma.maintenanceRecord.findMany({
    where: {
      itemId: item.id,
      status: "IN_REPAIR",
      startDate: { lte: endDate },
      OR: [
        { returnDate: null },
        { returnDate: { gte: startDate } },
      ],
    },
    select: {
      quantity: true,
    },
  });

  const maintenanceQuantity = activeMaintenance.reduce((sum, m) => sum + m.quantity, 0);
  const damagedQuantity = item.damagedQuantity || 0;

  const availableQuantity = Math.max(
    0,
    item.totalQuantity - bookedQuantity - maintenanceQuantity - damagedQuantity
  );

  return {
    itemId: item.id,
    name: item.name,
    sku: item.sku,
    totalQuantity: item.totalQuantity,
    bookedQuantity,
    maintenanceQuantity,
    damagedQuantity,
    availableQuantity,
    isAvailable: availableQuantity >= requestedQuantity,
    rentalPrice: Number(item.rentalPrice),
    pricingUnit: item.pricingUnit,
  };
}

/**
 * Get availability for all items in the inventory for a given date range
 */
export async function getAllItemsAvailability(
  startDate: Date,
  endDate: Date,
  categoryId?: string
): Promise<ItemAvailability[]> {
  const items = await prisma.inventoryItem.findMany({
    where: {
      categoryId: categoryId ? categoryId : undefined,
      status: { not: "RETIRED" },
    },
    include: {
      category: true,
    },
  });

  const results: ItemAvailability[] = [];

  for (const item of items) {
    const avail = await checkItemAvailability(item.id, startDate, endDate);
    results.push(avail);
  }

  return results;
}
