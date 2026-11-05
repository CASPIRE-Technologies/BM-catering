import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    const whereClause: any = {};
    if (bookingId) whereClause.bookingId = bookingId;

    const payments = await prisma.payment.findMany({
      where: whereClause,
      include: {
        booking: {
          include: { customer: true },
        },
      },
      orderBy: { paymentDate: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, amount, paymentMethod, reference, notes, paymentDate } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "Booking ID and Amount are required" }, { status: 400 });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 });
    }

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const paymentNumber = `PAY-${year}-${randomSuffix}`;

    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          paymentNumber,
          bookingId,
          amount: parsedAmount,
          paymentMethod: paymentMethod || "BANK_TRANSFER",
          paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
          reference,
          notes,
          recordedBy: user.name,
        },
      });

      // Update paid amount on booking
      const totalPaid = await tx.payment.aggregate({
        where: { bookingId },
        _sum: { amount: true },
      });

      const updatedPaidAmount = Number(totalPaid._sum.amount || 0);

      await tx.booking.update({
        where: { id: bookingId },
        data: {
          paidAmount: updatedPaidAmount,
        },
      });

      // Log audit
      await tx.auditLog.create({
        data: {
          action: "RECORD_PAYMENT",
          entity: "PAYMENT",
          entityId: payment.id,
          bookingId,
          performedBy: user.name,
          details: { amount: parsedAmount, paymentMethod, paymentNumber },
        },
      });

      return payment;
    });

    return NextResponse.json({ success: true, payment: result }, { status: 201 });
  } catch (error: any) {
    console.error("Payment POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to record payment" }, { status: 500 });
  }
}
