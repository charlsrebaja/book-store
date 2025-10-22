import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (
      !data.title ||
      !data.author ||
      !data.price ||
      data.stock === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const book = await prisma.book.update({
      where: { id: params.id },
      data: {
        title: data.title,
        author: data.author,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        imageUrl: data.imageUrl,
        stock: parseInt(data.stock),
        rating: data.rating ? parseFloat(data.rating) : undefined,
        reviews: data.reviews ? parseInt(data.reviews) : undefined,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    await prisma.book.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
