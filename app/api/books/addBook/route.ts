import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/config/db";
import { Book, BookInsertModel } from "../../models/book";
import { authenticate } from "../../utils/auth";

export async function POST(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const { title, author, publishedYear }: BookInsertModel = await req.json();

  const [insertResult] = await db
    .insert(Book)
    .values({
      title,
      author,
      publishedYear,
    })
    .execute();

  const response = {
    id: insertResult.insertId,
    message: "Book added successfully",
  };

  return NextResponse.json(response, { status: 201 });
}
