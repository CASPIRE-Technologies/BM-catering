import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { checkItemAvailability } from "@/lib/inventory";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        customer: true,
        services: true,
        items: {
          include: {
            item: true,
          },
        },
        payments: {
          orderBy: { paymentDate: "desc" },
        },
        auditLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.booking.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // If attempting to confirm, validate inventory availability to prevent double-booking
    if (body.status === "CONFIRMED" && existing.status !== "CONFIRMED") {
      for (const bItem of existing.items) {
        const avail = await checkItemAvailability(
          bItem.itemId,
          existing.startDate,
          existing.endDate,
          bItem.quantity,
          existing.id // Exclude current booking
        );

        if (!avail.isAvailable) {
          return NextResponse.json(
            {
              error: `Insufficient inventory for "${avail.name}". Only ${avail.availableQuantity} available for dates ${existing.startDate.toISOString().split("T")[0]} to ${existing.endDate.toISOString().split("T")[0]} (Requested: ${bItem.quantity}).`,
            },
            { status: 400 }
          );
        }
      }
    }

    // Update inside transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Calculate amounts if supplied
      const cateringAmount = body.cateringAmount !== undefined ? parseFloat(body.cateringAmount) : existing.cateringAmount;
      const rentalAmount = body.rentalAmount !== undefined ? parseFloat(body.rentalAmount) : existing.rentalAmount;
      const lightingAmount = body.lightingAmount !== undefined ? parseFloat(body.lightingAmount) : existing.lightingAmount;
      const discount = body.discount !== undefined ? parseFloat(body.discount) : existing.discount;
      const totalAmount = Number(cateringAmount) + Number(rentalAmount) + Number(lightingAmount) - Number(discount);

      const bookingUpdate = await tx.booking.update({
        where: { id },
        data: {
          status: body.status !== undefined ? body.status : existing.status,
          cateringAmount,
          rentalAmount,
          lightingAmount,
          discount,
          totalAmount: Math.max(0, totalAmount),
          eventLocation: body.eventLocation || existing.eventLocation,
          guestCount: body.guestCount !== undefined ? parseInt(body.guestCount, 10) : existing.guestCount,
          notes: body.notes !== undefined ? body.notes : existing.notes,
          adminNotes: body.adminNotes !== undefined ? body.adminNotes : existing.adminNotes,
        },
      });

      // Update items dispatch or return status if supplied
      if (Array.isArray(body.itemsToUpdate)) {
        for (const itemUpdate of body.itemsToUpdate) {
          await tx.bookingItem.update({
            where: { id: itemUpdate.bookingItemId },
            data: {
              dispatchStatus: itemUpdate.dispatchStatus,
              returnedQty: itemUpdate.returnedQty !== undefined ? parseInt(itemUpdate.returnedQty, 10) : undefined,
              damagedQuantity: itemUpdate.damagedQuantity !== undefined ? parseInt(itemUpdate.damagedQuantity, 10) : undefined,
              notes: itemUpdate.notes,
            },
          });

          // If damaged items reported, increment in inventory damagedQuantity
          if (itemUpdate.damagedQuantity && itemUpdate.damagedQuantity > 0) {
            await tx.inventoryItem.update({
              where: { id: itemUpdate.itemId },
              data: {
                damagedQuantity: { increment: parseInt(itemUpdate.damagedQuantity, 10) },
              },
            });
          }
        }
      }

      // Log audit
      await tx.auditLog.create({
        data: {
          action: "UPDATE_BOOKING",
          entity: "BOOKING",
          entityId: id,
          performedBy: user.name,
          details: {
            previousStatus: existing.status,
            newStatus: body.status || existing.status,
            totalAmount,
          },
        },
      });

      return bookingUpdate;
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("Booking PUT error:", error);
    return NextResponse.json({ error: error.message || "Failed to update booking" }, { status: 500 });
  }
}
