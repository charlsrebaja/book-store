import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mark as dynamic to prevent static generation during build
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    // Fetch top 8 bestselling books based on rating and reviews
    const books = await prisma.book.findMany({
      take: 8,
      orderBy: [{ rating: "desc" }, { reviews: "desc" }],
      where: {
        stock: {
          gt: 0, // Only show books in stock
        },
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching bestsellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch bestsellers" },
      { status: 500 }
    );
  }
}
