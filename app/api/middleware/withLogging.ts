import { NextRequest, NextResponse } from "next/server";
import { runMiddleware } from "../middleware";
import { apiLogger } from "../utils/apiLogger";

type Handler = (req: NextRequest) => Promise<NextResponse>;

export function withLogging(handler: Handler): Handler {
  return async (req: NextRequest) => {
    const resStart = Date.now();
    let response: NextResponse;
    let ApiUnknownError: Error | undefined;

    try {
      response = await handler(req);
    } catch (error) {
      ApiUnknownError = error as Error;
      response = NextResponse.json(
        { message: "Internal Server Error", statusCode: 500 },
        { status: 500 }
      );
    }

    runMiddleware(
      req,
      response,
      (req: NextRequest, res: NextResponse, next: Function) =>
        apiLogger(req, res, resStart, next, ApiUnknownError)
    ).catch((e) => {
      if (e instanceof Error) {
        console.trace(e.message);
      }
    });

    return response;
  };
}
