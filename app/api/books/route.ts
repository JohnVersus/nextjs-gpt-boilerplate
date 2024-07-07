import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { authenticate } from "../utils/auth";
import { db } from "../config/db";
import { getCurrentUTCTime, logApiRequest } from "../utils";

export async function GET(req: NextRequest) {
  const startTime = getCurrentUTCTime();

  const authResponse = authenticate(req);
  if (authResponse) {
    logApiRequest(req, startTime, "Unauthorized access attempt");
    return authResponse;
  }

  try {
    const books: BookSelectModel[] = await db.select().from(Book).execute();
    logApiRequest(req, startTime, "Books retrieved successfully");
    return NextResponse.json(books);
  } catch (error) {
    logApiRequest(req, startTime, "Failed to retrieve books", error as Error);
    return NextResponse.json(
      { message: "Internal Server Error", statusCode: 500 },
      { status: 500 }
    );
  }
}
