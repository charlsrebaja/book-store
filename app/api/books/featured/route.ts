import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mark as dynamic to prevent static generation during build
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "8");

    const featuredBooks = await prisma.book.findMany({
      where: {
        isFeatured: true,
        stock: {
          gt: 0, // Only show books that are in stock
        },
      },
      take: limit,
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(featuredBooks);
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured books" },
      { status: 500 }
    );
  }
}
