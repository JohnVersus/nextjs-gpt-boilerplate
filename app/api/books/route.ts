import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { db } from "../config/db";
import { withAuth, withLogging } from "../middleware";

type BookWithoutSummary = Omit<
  BookSelectModel,
  "summary" | "createdAt" | "updatedAt"
>;

async function getBooksHandler(req: NextRequest) {
  const books: BookWithoutSummary[] = await db
    .select({
      id: Book.id,
      title: Book.title,
      author: Book.author,
      publishedYear: Book.publishedYear,
    })
    .from(Book)
    .execute();
  return NextResponse.json(books, { status: 200 });
}

export const GET = withLogging(withAuth(getBooksHandler));
