import { NextRequest, NextResponse } from "next/server";
import { Book, BookInsertModel } from "../../models/book";
import { authenticate } from "../../utils/auth";
import { db } from "../../config/db";
import { getCurrentUTCTime, logApiRequest } from "../../utils";

export async function POST(req: NextRequest) {
  const startTime = getCurrentUTCTime();

  const authResponse = authenticate(req);
  if (authResponse) {
    logApiRequest(req, startTime, "Unauthorized access attempt");
    return authResponse;
  }

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
