import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const sortby = url.searchParams.get("sortby")

  const response = await db.bookmark.findMany({
    where: {
      userId: payload?.id,
      url: {
        contains: "youtube.com",
      },
    },
    orderBy: {
      createdAt: sortby === "asc" ? "asc" : "desc",
    },
  })

  console.log("response", response)

  return NextResponse.json(
    {
      success: true,
      data: response,
      message: "Videos fetched successfully",
    },
    { status: 200 }
  )
}
