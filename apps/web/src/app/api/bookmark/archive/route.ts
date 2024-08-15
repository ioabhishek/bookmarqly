import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

// Add/Remove Favorites
export async function POST(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const { bookmarkId, archive } = await req.json()

  const response = await db.bookmark.update({
    where: {
      userId: payload?.id,
      id: bookmarkId,
    },
    data: {
      archive,
    },
  })

  return NextResponse.json(
    {
      success: true,
      response,
      message: archive === true ? "Added to archive" : "Removed from archive",
    },
    { status: 200 }
  )
}
