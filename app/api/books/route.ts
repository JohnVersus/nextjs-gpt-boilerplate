import { NextRequest, NextResponse } from "next/server";
import { db } from "../config/drizzle";
import { Book, BookSelectModel } from "../models/book";
import { authenticate } from "../utils/auth";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const books: BookSelectModel[] = await db.select().from(Book).execute();
  return NextResponse.json(books);
}
