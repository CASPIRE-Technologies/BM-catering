import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const whereClause: any = {};
    if (category && category !== "ALL") whereClause.category = category;

    const images = await prisma.galleryImage.findMany({
      where: whereClause,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ images });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, category, imageUrl, description, featured } = await req.json();

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: "Title, category, and imageUrl are required" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        title,
        category,
        imageUrl,
        description,
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create image" }, { status: 500 });
  }
}
