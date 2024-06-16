import { NextRequest, NextResponse } from "next/server";
const validApiKey = process.env.API_KEY;

export function authenticate(req: NextRequest): NextResponse | null {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== validApiKey) {
    return NextResponse.json(
      { message: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }
  return null;
}
