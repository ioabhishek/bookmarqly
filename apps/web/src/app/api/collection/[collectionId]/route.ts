import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// Collection details
export async function GET(req: Request) {
  const session = await auth()

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
      title: true,
      description: true,
      thumbnail: true,
      isPublic: true,
      userId: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      bookmark: {
        select: {
          id: true,
          title: true,
          url: true,
          note: true,
          ogImage: true,
          ogTitle: true,
          ogDescription: true,
          createdAt: true,
        },
      },
    },
  })

  if (collection?.isPublic) {
    return NextResponse.json(
      {
        success: true,
        data: collection,
        message: "Collection details fetched successfully",
      },
      { status: 200 }
    )
  } else {
    if (session?.user?.id === collection?.userId) {
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
}
