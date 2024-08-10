import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ error }, { status })
  }

  console.log("user id is:", payload?.id)
  return NextResponse.json({ message: "JWT is valid", payload })
}
