import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { authenticate } from "../utils/auth";
import { db } from "../config/db";
import { logApiRequest } from "@/app/utils/logger";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const startTime = parseInt(
    req.nextUrl.searchParams.get("startTime") || "",
    10
  );

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
