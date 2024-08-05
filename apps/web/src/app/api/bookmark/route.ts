import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createBookmarkSchema, updateBookmarkSchema } from "@/utils/validations"
import { NextResponse } from "next/server"
const og = require("open-graph")

async function fetchOpenGraphData(url: any) {
  return new Promise((resolve, reject) => {
    og(url, (err: any, meta: any) => {
      if (err) {
        console.error("Error fetching Open Graph data:", err)
        return reject(err)
      }
      const ogImage = meta.image
      const ogTitle = meta.title
      const ogDescription = meta.description

      resolve({ ogImage, ogTitle, ogDescription })
    })
  })
}

// Get all bookmarks
export async function GET(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to view bookmarks",
      },
      { status: 401 }
    )
  }

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: bookmarks,
      message: "Bookmarks fetched successfully",
    },
    { status: 201 }
  )
}

// Create new bookmark
export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to create bookmarks",
      },
      { status: 401 }
    )
  }

  const jsonRequest = await req.json()

  const validationResult = createBookmarkSchema.safeParse(jsonRequest)

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }))

    return NextResponse.json(
      { success: false, message: "Validation error", errors: errors },
      { status: 400 }
    )
  }

  const { title, url, note, collectionId } = validationResult.data

  const collection = await db.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!collection) {
    return NextResponse.json(
      { success: false, message: "Please create a collection first" },
      { status: 404 }
    )
  }

  let ogData
  await (async () => {
    try {
      const data = await fetchOpenGraphData(url)
      ogData = data
    } catch (error) {
      console.error("Error:", error)
    }
  })()

  console.log(ogData)

  const bookmark = await db.bookmark.create({
    data: {
      title: title,
      url: url,
      note: note,
      collectionId: collectionId,
      userId: session.user.id,
      ogImage: ogData?.ogImage?.url,
      ogTitle: ogData?.ogTitle,
      ogDescription: ogData?.ogDescription,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: bookmark,
      message: "Bookmark created successfully",
    },
    { status: 200 }
  )
}

// Update bookmark
export async function PUT(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to view bookmarks",
      },
      { status: 401 }
    )
  }

  const jsonRequest = await req.json()

  const validationResult = updateBookmarkSchema.safeParse(jsonRequest)

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }))

    return NextResponse.json(
      { success: false, message: "Validation error", errors: errors },
      { status: 400 }
    )
  }

  const { title, url, note, bookmarkId } = validationResult.data

  const bookmark = await db.bookmark.findUnique({
    where: {
      id: bookmarkId,
    },
  })

  if (!bookmark) {
    return NextResponse.json(
      { success: false, message: "No bookmark found" },
      { status: 404 }
    )
  }

  const updatedBookmark = await db.bookmark.update({
    where: {
      id: bookmarkId,
    },
    data: {
      title: title,
      url: url,
      note: note,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: updatedBookmark,
      message: "Bookmark updated successfully",
    },
    { status: 200 }
  )
}

// Delete a bookmark
export async function DELETE(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to delete a bookmark",
      },
      { status: 401 }
    )
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("bookmarkId")

  // const { id } = await req.json()
  // console.log("bookmark id is", id)

  const bookmark = await db.bookmark.findUnique({
    where: {
      id: id,
    },
  })

  if (!bookmark) {
    return NextResponse.json(
      { success: false, message: "No bookmark found" },
      { status: 404 }
    )
  }

  if (bookmark?.userId !== session.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to delete this bookmark",
      },
      { status: 401 }
    )
  }

  await db.bookmark.delete({
    where: {
      id: id,
    },
  })

  return NextResponse.json(
    { success: true, message: "Bookmark deleted successfully" },
    { status: 200 }
  )
}
