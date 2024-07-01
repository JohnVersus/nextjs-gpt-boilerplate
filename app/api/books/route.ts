import { NextRequest, NextResponse } from "next/server";
import { Book, BookSelectModel } from "../models/book";
import { authenticate } from "../utils/auth";
import { db } from "@/app/api/config/db";

export async function GET(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const books: BookSelectModel[] = await db.select().from(Book).execute();
  return NextResponse.json(books);
}
