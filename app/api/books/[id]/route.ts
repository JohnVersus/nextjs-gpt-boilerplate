import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../../models/book";
import { eq } from "drizzle-orm";
import { withAuth, withLogging } from "../../middleware";
import { db } from "../../../config/db";

async function getBookHandler(req: NextRequest) {
  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid ID format", statusCode: 400 },
      { status: 400 }
    );
  }

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

  return NextResponse.json(book, { status: 200 });
}

export const GET = withLogging(withAuth(getBookHandler));
