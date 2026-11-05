import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { checkItemAvailability } from "@/lib/inventory";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    const whereClause: any = {
      status: { not: "RETIRED" },
    };

    if (category && category !== "ALL") {
      whereClause.category = { slug: category };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const items = await prisma.inventoryItem.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: { name: "asc" },
    });

    // If dates are provided, calculate availability dynamically
    let itemsWithAvailability = items.map((item) => ({
      ...item,
      rentalPrice: Number(item.rentalPrice),
      availableQuantity: Math.max(0, item.totalQuantity - (item.damagedQuantity || 0) - (item.maintenanceQuantity || 0)),
      isDateChecked: false,
    }));

    if (startDateStr && endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        itemsWithAvailability = await Promise.all(
          items.map(async (item) => {
            const avail = await checkItemAvailability(item.id, startDate, endDate);
            return {
              ...item,
              rentalPrice: Number(item.rentalPrice),
              bookedQuantity: avail.bookedQuantity,
              maintenanceQuantity: avail.maintenanceQuantity,
              damagedQuantity: avail.damagedQuantity,
              availableQuantity: avail.availableQuantity,
              isAvailable: avail.isAvailable,
              isDateChecked: true,
            };
          })
        );
      }
    }

    return NextResponse.json({ items: itemsWithAvailability });
  } catch (error: any) {
    console.error("Inventory GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, categoryId, totalQuantity, rentalPrice, pricingUnit, sku, description, imageUrl, condition } = data;

    if (!name || !categoryId || totalQuantity === undefined || rentalPrice === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const generatedSku = sku || `ITEM-${Date.now().toString().slice(-6)}`;

    const newItem = await prisma.inventoryItem.create({
      data: {
        name,
        sku: generatedSku,
        categoryId,
        totalQuantity: parseInt(totalQuantity, 10),
        rentalPrice: parseFloat(rentalPrice),
        pricingUnit: pricingUnit || "PER_DAY",
        description,
        imageUrl: imageUrl || "/images/real/PHOTO-2026-11-04-21-37-29.jpg",
        condition: condition || "EXCELLENT",
        status: "AVAILABLE",
        movements: {
          create: {
            type: "STOCK_IN",
            quantity: parseInt(totalQuantity, 10),
            reason: "Initial item registration",
            performedBy: user.name,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ item: newItem, success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Inventory POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create item" }, { status: 500 });
  }
}
