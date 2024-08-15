import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

// Add/Remove Favorites
export async function POST(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const { bookmarkId, favorite } = await req.json()

  const response = await db.bookmark.update({
    where: {
      userId: payload?.id,
      id: bookmarkId,
    },
    data: {
      favorite,
    },
  })

  return NextResponse.json(
    {
      success: true,
      response,
      message:
        favorite === true ? "Added to favorites" : "Removed from favorites",
    },
    { status: 200 }
  )
}
