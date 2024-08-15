import { redis } from "@/lib/redis"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const bookmarkKeys = await redis.keys(`user:bookmarks:${payload?.id}:*`)

  const bookmarks = await Promise.all(
    bookmarkKeys.map((key) => redis.json.get(key))
  )

  return NextResponse.json({ message: "JWT is valid", bookmarks })
}
