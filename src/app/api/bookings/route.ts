import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const whereClause: any = {};

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { bookingNumber: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } },
        { customer: { phone: { contains: search, mode: "insensitive" } } },
        { eventLocation: { contains: search, mode: "insensitive" } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        customer: true,
        services: true,
        items: {
          include: {
            item: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    console.error("Bookings GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      customerName,
      phone,
      whatsapp,
      email,
      address,
      eventType,
      eventLocation,
      startDate,
      endDate,
      guestCount,
      services, // Array of { serviceType, name, amount, details }
      items,    // Array of { itemId, quantity, rentalRate }
      cateringAmount = 0,
      rentalAmount = 0,
      lightingAmount = 0,
      discount = 0,
      notes,
      isAdminCreation = false,
      status = "ENQUIRY",
    } = data;

    if (!customerName || !phone || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Customer name, phone, start date and end date are required" },
        { status: 400 }
      );
    }

    // 1. Find or create Customer
    let customer = await prisma.customer.findFirst({
      where: {
        OR: [
          { phone: phone.trim() },
          ...(email ? [{ email: email.trim().toLowerCase() }] : []),
        ],
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName.trim(),
          phone: phone.trim(),
          whatsapp: whatsapp ? whatsapp.trim() : phone.trim(),
          email: email ? email.trim().toLowerCase() : null,
          address: address || null,
        },
      });
    }

    // 2. Generate unique booking number (BK-YYYY-XXXX)
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `BK-${year}-${randomSuffix}`;

    // 3. Calculate financial totals
    const parsedCatering = parseFloat(cateringAmount) || 0;
    const parsedRental = parseFloat(rentalAmount) || 0;
    const parsedLighting = parseFloat(lightingAmount) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const calculatedTotal = parsedCatering + parsedRental + parsedLighting - parsedDiscount;

    // 4. Create Booking in database transaction
    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.booking.create({
        data: {
          bookingNumber,
          customerId: customer.id,
          eventType: eventType || "Event Celebration",
          eventLocation: eventLocation || "Venue TBD, Sri Lanka",
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status: isAdminCreation ? status : "ENQUIRY",
          cateringAmount: parsedCatering,
          rentalAmount: parsedRental,
          lightingAmount: parsedLighting,
          discount: parsedDiscount,
          totalAmount: Math.max(0, calculatedTotal),
          guestCount: guestCount ? parseInt(guestCount, 10) : null,
          notes,
          adminNotes: isAdminCreation ? "Created by admin" : "Submitted through public website",
        },
      });

      // Add services breakdown
      if (Array.isArray(services) && services.length > 0) {
        await tx.bookingService.createMany({
          data: services.map((s: any) => ({
            bookingId: createdBooking.id,
            serviceType: s.serviceType || "CATERING",
            name: s.name,
            amount: parseFloat(s.amount) || 0,
            details: typeof s.details === "object" ? JSON.stringify(s.details) : s.details || "",
          })),
        });
      }

      // Add selected rental items
      if (Array.isArray(items) && items.length > 0) {
        await tx.bookingItem.createMany({
          data: items.map((i: any) => {
            const qty = parseInt(i.quantity, 10) || 1;
            const rate = parseFloat(i.rentalRate) || 0;
            return {
              bookingId: createdBooking.id,
              itemId: i.itemId,
              quantity: qty,
              rentalRate: rate,
              subtotal: qty * rate,
              dispatchStatus: "PENDING",
            };
          }),
        });
      }

      // Audit log
      await tx.auditLog.create({
        data: {
          action: "CREATE_BOOKING",
          entity: "BOOKING",
          entityId: createdBooking.id,
          performedBy: isAdminCreation ? "Admin" : "Public Client",
          details: { bookingNumber, totalAmount: calculatedTotal, status: createdBooking.status },
        },
      });

      return createdBooking;
    });

    return NextResponse.json({
      success: true,
      bookingNumber: booking.bookingNumber,
      bookingId: booking.id,
      message: "Booking enquiry submitted successfully. Our team will contact you shortly.",
    }, { status: 201 });
  } catch (error: any) {
    console.error("Booking POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}
