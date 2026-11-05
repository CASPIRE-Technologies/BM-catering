import { NextResponse } from "next/server";
import { checkItemAvailability, getAllItemsAvailability } from "@/lib/inventory";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");
    const itemId = searchParams.get("itemId");
    const categoryId = searchParams.get("categoryId") || undefined;
    const requestedQty = parseInt(searchParams.get("quantity") || "1", 10);

    if (!startDateStr || !endDateStr) {
      return NextResponse.json(
        { error: "Both startDate and endDate are required" },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    if (itemId) {
      const avail = await checkItemAvailability(itemId, startDate, endDate, requestedQty);
      return NextResponse.json({ availability: avail });
    }

    const allAvailability = await getAllItemsAvailability(startDate, endDate, categoryId);
    return NextResponse.json({ items: allAvailability });
  } catch (error: any) {
    console.error("Availability check error:", error);
    return NextResponse.json({ error: error.message || "Availability check failed" }, { status: 500 });
  }
}
