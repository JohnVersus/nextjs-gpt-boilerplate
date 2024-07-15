import { NextRequest, NextResponse } from "next/server";
import { Book, BookInsertModel } from "../../models/book";
import { withAuth, withLogging } from "../../middleware";
import { db } from "../../config/db";

async function addBookHandler(req: NextRequest) {
  const { title, author, publishedYear, summary }: BookInsertModel =
    await req.json();

  const [insertResult] = await db
    .insert(Book)
    .values({
      title,
      author,
      publishedYear,
      summary,
    })
    .execute();

  const response = {
    id: insertResult.insertId,
    message: "Book added successfully",
  };

  return NextResponse.json(response, { status: 201 });
}

export const POST = withLogging(withAuth(addBookHandler));
