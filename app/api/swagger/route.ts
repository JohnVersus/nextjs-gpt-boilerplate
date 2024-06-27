import { NextRequest, NextResponse } from "next/server";
import { OpenAPIV1 } from "./swagger";

export async function GET(req: NextRequest) {
  return NextResponse.json(OpenAPIV1);
}
