import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // req.cookies.getAll()

  return NextResponse.json({ cookies: req.cookies.getAll() })
}
