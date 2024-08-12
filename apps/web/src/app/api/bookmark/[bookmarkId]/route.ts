import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

// Bookmark details
export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const pathname = url.pathname
  const parts = pathname.split("/")

  const id = parts[parts.length - 1]

  const bookmark = await db.bookmark.findUnique({
    where: {
      id: id,
    },
  })

  if (payload?.id === bookmark?.userId) {
    if (!bookmark) {
      return NextResponse.json(
        {
          success: false,
          message: "No bookmark found",
        },
        { status: 401 }
      )
    } else {
      return NextResponse.json(
        {
          success: true,
          data: bookmark,
          message: "Bookmark details fetched successfully",
        },
        { status: 200 }
      )
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to access this bookmark",
      },
      { status: 401 }
    )
  }
}

// Add/Remove Favorites
export async function POST(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const { bookmarkId, favorite } = await req.json()

  await db.bookmark.update({
    where: { id: bookmarkId },
    data: {
      favorite,
    },
  })

  return NextResponse.json(
    {
      success: true,
      message:
        favorite === true ? "Added to favorites" : "Removed from favorites",
    },
    { status: 200 }
  )
}
