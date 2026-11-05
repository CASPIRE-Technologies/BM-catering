import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "all";

    // 1. Fetch all bookings
    const bookings = await prisma.booking.findMany({
      include: {
        customer: true,
        items: true,
        services: true,
        payments: true,
      },
    });

    // 2. Filter active/confirmed bookings for revenue calculation
    // Cancelled bookings are excluded from recognized revenue
    const validBookings = bookings.filter((b) => b.status !== "CANCELLED");

    // 3. Service Breakdown
    let cateringRevenue = 0;
    let rentalRevenue = 0;
    let lightingRevenue = 0;
    let totalBookingValue = 0;
    let totalDiscount = 0;

    for (const b of validBookings) {
      cateringRevenue += Number(b.cateringAmount || 0);
      rentalRevenue += Number(b.rentalAmount || 0);
      lightingRevenue += Number(b.lightingAmount || 0);
      totalDiscount += Number(b.discount || 0);
      totalBookingValue += Number(b.totalAmount || 0);
    }

    // 4. Cash received (actual payments in bank/cash)
    const allPayments = await prisma.payment.findMany();
    const totalReceivedPayments = allPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    // 5. Total Expenses
    const allExpenses = await prisma.expense.findMany();
    const totalExpenses = allExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

    // 6. Outstanding balances on confirmed / active bookings
    const confirmedBookings = bookings.filter(
      (b) => b.status === "CONFIRMED" || b.status === "IN_PROGRESS" || b.status === "COMPLETED"
    );
    const invoicedRevenue = confirmedBookings.reduce((sum, b) => sum + Number(b.totalAmount), 0);
    const outstandingPayments = Math.max(0, invoicedRevenue - totalReceivedPayments);
    const netProfit = totalReceivedPayments - totalExpenses;

    // 7. Counts
    const totalBookingsCount = bookings.length;
    const pendingEnquiriesCount = bookings.filter((b) => b.status === "ENQUIRY" || b.status === "PENDING_CONFIRMATION").length;
    
    const now = new Date();
    const upcomingEvents = bookings
      .filter((b) => new Date(b.startDate) >= now && b.status !== "CANCELLED")
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5);

    const activeRentalsCount = bookings.filter(
      (b) => b.status === "IN_PROGRESS" || (b.status === "CONFIRMED" && new Date(b.startDate) <= now && new Date(b.endDate) >= now)
    ).length;

    // 8. Inventory health
    const inventoryItems = await prisma.inventoryItem.findMany();
    const totalInventoryCount = inventoryItems.reduce((sum, i) => sum + i.totalQuantity, 0);
    const totalDamagedCount = inventoryItems.reduce((sum, i) => sum + (i.damagedQuantity || 0), 0);
    const totalMaintenanceCount = inventoryItems.reduce((sum, i) => sum + (i.maintenanceQuantity || 0), 0);
    const availableInventoryCount = Math.max(0, totalInventoryCount - totalDamagedCount - totalMaintenanceCount);

    // Low stock items (items where available is <= 20% of total or <= 2 units)
    const lowStockItems = inventoryItems
      .filter((i) => {
        const avail = i.totalQuantity - (i.damagedQuantity || 0) - (i.maintenanceQuantity || 0);
        return avail <= Math.max(2, Math.floor(i.totalQuantity * 0.2));
      })
      .map((i) => ({
        id: i.id,
        name: i.name,
        sku: i.sku,
        totalQuantity: i.totalQuantity,
        available: Math.max(0, i.totalQuantity - (i.damagedQuantity || 0) - (i.maintenanceQuantity || 0)),
      }));

    // 9. Monthly revenue trend (last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyTrendMap: Record<string, { month: string; catering: number; rentals: number; lighting: number; total: number }> = {};

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
      monthlyTrendMap[key] = { month: key, catering: 0, rentals: 0, lighting: 0, total: 0 };
    }

    // Populate trend
    for (const b of validBookings) {
      const bDate = new Date(b.startDate);
      const key = `${monthNames[bDate.getMonth()]} ${bDate.getFullYear().toString().slice(-2)}`;
      if (monthlyTrendMap[key]) {
        monthlyTrendMap[key].catering += Number(b.cateringAmount || 0);
        monthlyTrendMap[key].rentals += Number(b.rentalAmount || 0);
        monthlyTrendMap[key].lighting += Number(b.lightingAmount || 0);
        monthlyTrendMap[key].total += Number(b.totalAmount || 0);
      }
    }

    const revenueTrend = Object.values(monthlyTrendMap);

    // 10. Service category distribution for Pie Chart
    const totalServiceSum = cateringRevenue + rentalRevenue + lightingRevenue || 1;
    const categoryDistribution = [
      { name: "Catering", value: cateringRevenue, percentage: Math.round((cateringRevenue / totalServiceSum) * 100) },
      { name: "Equipment Rentals", value: rentalRevenue, percentage: Math.round((rentalRevenue / totalServiceSum) * 100) },
      { name: "Lighting & Decor", value: lightingRevenue, percentage: Math.round((lightingRevenue / totalServiceSum) * 100) },
    ];

    return NextResponse.json({
      summary: {
        totalBookingValue,
        invoicedRevenue,
        totalReceivedPayments,
        outstandingPayments,
        totalExpenses,
        netProfit,
        cateringRevenue,
        rentalRevenue,
        lightingRevenue,
        totalDiscount,
        totalBookingsCount,
        pendingEnquiriesCount,
        activeRentalsCount,
        totalInventoryCount,
        availableInventoryCount,
        totalDamagedCount,
        totalMaintenanceCount,
      },
      upcomingEvents,
      lowStockItems,
      revenueTrend,
      categoryDistribution,
    });
  } catch (error: any) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to load analytics" }, { status: 500 });
  }
}
