import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/drizzle";
import { Book } from "../../../models/book";
import { eq } from "drizzle-orm";
import { authenticate } from "@/app/api/utils/auth";

export async function DELETE(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid ID format", statusCode: 400 },
      { status: 400 }
    );
  }

  await db.delete(Book).where(eq(Book.id, id)).execute();
  return NextResponse.json(null, { status: 204 });
}
