import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { db } from "../config/db";
import { withAuth, withLogging } from "../middleware";

async function getBooksHandler(req: NextRequest) {
  const books: BookSelectModel[] = await db.select().from(Book).execute();
  return NextResponse.json(books, { status: 200 });
}

export const GET = withLogging(withAuth(getBooksHandler));
