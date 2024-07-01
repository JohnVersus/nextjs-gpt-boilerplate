import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../../models/book";
import { eq } from "drizzle-orm";
import { authenticate } from "../../utils/auth";
import { db } from "@/app/api/config/db";
import { logApiRequest } from "@/app/utils/logger";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const startTime = parseInt(
    req.nextUrl.searchParams.get("startTime") || "",
    10
  );
  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    logApiRequest(req, startTime, "Invalid ID format");
    return NextResponse.json(
      { message: "Invalid ID format", statusCode: 400 },
      { status: 400 }
    );
  }

  try {
    const books: BookSelectModel[] = await db
      .select()
      .from(Book)
      .where(eq(Book.id, id))
      .execute();

    const book = books[0];

    if (!book) {
      logApiRequest(req, startTime, "Book not found");
      return NextResponse.json(
        { message: "Book not found", statusCode: 404 },
        { status: 404 }
      );
    }

    logApiRequest(req, startTime, "Book retrieved successfully");
    return NextResponse.json(book);
  } catch (error) {
    logApiRequest(req, startTime, "Failed to retrieve book", error as Error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
