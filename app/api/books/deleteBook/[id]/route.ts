import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { Book } from "../../../models/book";
import { eq } from "drizzle-orm";
import { authenticate } from "@/app/api/utils/auth";
import { logApiRequest } from "@/app/utils/logger";

export async function DELETE(req: NextRequest) {
  const authResponse = authenticate(req);
  if (authResponse) return authResponse;

  const startTime = parseInt(
    req.nextUrl.searchParams.get("startTime") || "",
    10
  );
  const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

  if (isNaN(id)) {
    logApiRequest(req, startTime, "Invalid ID format");
    return NextResponse.json(
      { message: "Invalid ID format", statusCode: 400 },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.delete(Book).where(eq(Book.id, id)).execute();

    if (result.affectedRows === 0) {
      logApiRequest(req, startTime, "Book not found");
      return NextResponse.json(
        { message: "Book not found", statusCode: 404 },
        { status: 404 }
      );
    }

    logApiRequest(req, startTime, "Book deleted successfully");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logApiRequest(req, startTime, "Failed to delete book", error as Error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
