import { NextRequest, NextResponse } from "next/server";
import { db } from "../../config/drizzle";
import { Book, BookInsertModel } from "../../models/book";
import { authenticate } from "../../utils/auth";

export async function POST(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const { title, author, publishedYear }: BookInsertModel = await req.json();

  const insertedBook = await db
    .insert(Book)
    .values({
      title,
      author,
      publishedYear,
    })
    .execute();

  return NextResponse.json(insertedBook, { status: 201 });
}
