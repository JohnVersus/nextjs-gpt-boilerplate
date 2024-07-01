import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const startTime = Date.now();
  req.nextUrl.searchParams.set("startTime", startTime.toString());

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/books", "/api/books/:path*"],
};
