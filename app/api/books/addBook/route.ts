import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/config/db";
import { Book, BookInsertModel } from "../../models/book";
import { authenticate } from "../../utils/auth";
import { logApiRequest } from "@/app/utils/logger";

export async function POST(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const startTime = parseInt(
    req.nextUrl.searchParams.get("startTime") || "",
    10
  );

  const { title, author, publishedYear }: BookInsertModel = await req.json();

  try {
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

    logApiRequest(req, startTime, "Book added successfully");
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    logApiRequest(req, startTime, "Failed to add book", error as Error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
