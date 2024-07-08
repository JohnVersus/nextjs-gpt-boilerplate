import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "../utils/auth";

type Handler = (req: NextRequest) => Promise<NextResponse>;

export function withAuth(handler: Handler): Handler {
  return async (req: NextRequest) => {
    const authResponse = authenticate(req);
    if (authResponse) {
      return authResponse;
    }
    return handler(req);
  };
}
