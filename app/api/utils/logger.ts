import { NextRequest } from "next/server";

export function logApiRequest(
  req: NextRequest,
  startTime: number,
  message: string,
  error?: Error
) {
  const responseTime = startTime ? Date.now() - startTime : "unknown";
  const logMessage = `[API] ${req.method} ${req.url} - ${responseTime}ms - ${message}`;

  if (error) {
    console.error(`${logMessage} - Error: ${error.message}`);
  } else {
    console.log(logMessage);
  }
}
