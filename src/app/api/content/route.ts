import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const content = await prisma.websiteContent.findMany();
    const contentMap: Record<string, any> = {};
    for (const c of content) {
      contentMap[c.section] = {
        title: c.title,
        subtitle: c.subtitle,
        content: c.content,
      };
    }
    return NextResponse.json({ content: contentMap });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { section, title, subtitle, content } = await req.json();

    const updated = await prisma.websiteContent.upsert({
      where: { section },
      update: { title, subtitle, content },
      create: { section, title, subtitle, content },
    });

    return NextResponse.json({ success: true, content: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update content" }, { status: 500 });
  }
}
