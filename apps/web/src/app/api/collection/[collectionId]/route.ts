import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

// Collection details
export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const pathname = url.pathname
  const parts = pathname.split("/")

  const id = parts[parts.length - 1]

  const collection = await db.collection.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      userId: true,
      bookmarks: {
        select: {
          id: true,
          url: true,
          ogImage: true,
          ogTitle: true,
          ogDescription: true,
        },
      },
    },
  })

  console.log("single collection", collection)

  if (payload?.id === collection?.userId) {
    return NextResponse.json(
      {
        success: true,
        data: collection,
        message: "Collection details fetched successfully",
      },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to access this collection",
      },
      { status: 401 }
    )
  }
}
