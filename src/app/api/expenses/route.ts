import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const whereClause: any = {};
    if (category && category !== "ALL") whereClause.category = category;

    const expenses = await prisma.expense.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    });

    const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return NextResponse.json({ expenses, totalExpense });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, category, amount, vendor, description, date, receiptUrl } = await req.json();

    if (!title || !category || !amount) {
      return NextResponse.json({ error: "Title, Category and Amount are required" }, { status: 400 });
    }

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const expenseNumber = `EXP-${year}-${randomSuffix}`;

    const expense = await prisma.expense.create({
      data: {
        expenseNumber,
        title,
        category,
        amount: parseFloat(amount),
        vendor,
        description,
        date: date ? new Date(date) : new Date(),
        receiptUrl,
        recordedBy: user.name,
      },
    });

    return NextResponse.json({ success: true, expense }, { status: 201 });
  } catch (error: any) {
    console.error("Expense POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to record expense" }, { status: 500 });
  }
}
