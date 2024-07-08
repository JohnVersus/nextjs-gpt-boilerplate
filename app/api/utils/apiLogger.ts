import { NextRequest, NextResponse } from "next/server";

export function apiLogger(
  req: NextRequest,
  res: NextResponse,
  resStart: number,
  next: Function,
  error?: Error
) {
  const responseTime = Date.now() - resStart;
  const statusCode = res.status;
  const { method } = req;
  const endpointPath = req.nextUrl.pathname;

  const logMessage = `[API] ${method} ${endpointPath} - ${statusCode} - ${responseTime}ms`;

  if (error) {
    console.error(`${logMessage} - Error: ${error.message}`);
  } else {
    console.log(logMessage);
  }

  next();
}
