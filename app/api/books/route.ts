import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { authenticate } from "../utils/auth";
import { db } from "@/app/api/config/db";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  try {
    const books: BookSelectModel[] = await db.select().from(Book).execute();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", statusCode: 500 },
      { status: 500 }
    );
  }
}
