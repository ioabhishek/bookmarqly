import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// Bookmark details
export async function GET(req: Request) {
  const session = await auth()

  const url = new URL(req.url)
  const pathname = url.pathname
  const parts = pathname.split("/")

  const id = parts[parts.length - 1]

  const bookmark = await db.bookmark.findUnique({
    where: {
      id: id,
    },
  })

  if (session?.user?.id === bookmark?.userId) {
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
