import { NextRequest, NextResponse } from "next/server";
import { Book } from "../../../models/book";
import { eq } from "drizzle-orm";
import { withAuth, withLogging } from "../../../middleware";
import { db } from "../../../config/db";

async function deleteBookHandler(req: NextRequest) {
  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid ID format", statusCode: 400 },
      { status: 400 }
    );
  }

  const [result] = await db.delete(Book).where(eq(Book.id, id)).execute();

  if (result.affectedRows === 0) {
    return NextResponse.json(
      { message: "Book not found", statusCode: 404 },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}

export const DELETE = withLogging(withAuth(deleteBookHandler));
