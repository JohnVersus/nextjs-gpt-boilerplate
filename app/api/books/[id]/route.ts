import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../../models/book";
import { eq } from "drizzle-orm";
import { authenticate } from "../../utils/auth";
import { db } from "@/app/api/config/db";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
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
      return NextResponse.json(
        { message: "Book not found", statusCode: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error:" + `${(error as Error).message}`,
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
