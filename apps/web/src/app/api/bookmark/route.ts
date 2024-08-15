import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { verifyToken } from "@/utils/jwtVerification"
import { createBookmarkSchema, updateBookmarkSchema } from "@/utils/validations"
import { NextRequest, NextResponse } from "next/server"
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
export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const favorites = url.searchParams.get("favorites")
  const archive = url.searchParams.get("archive")
  const sortby = url.searchParams.get("sortby")
  const page = parseInt(url.searchParams.get("page") ?? "1", 10)
  const limit = parseInt(url.searchParams.get("limit") ?? "12", 10)

  const skip = (page - 1) * limit

  // const bookmarkItems = await redis.lrange("user:bookmarks", 0, 3)

  // const bookmarkKeys = await redis.keys(`user:bookmarks:${payload?.id}:*`)

  // const bookmarksList = await Promise.all(
  //   bookmarkKeys.map((key) => redis.json.get(key))
  // )

  // if (bookmarksList) {
  //   const filteredBookmarks = bookmarksList
  //     .filter((bookmark) => {
  //       if (favorites && !bookmark.favorites) return false
  //       if (archive !== undefined && !bookmark?.archive !== archive)
  //         return false
  //       return true
  //     })
  //     .sort((a, b) => {
  //       const dateA = new Date(a?.createdAt)
  //       const dateB = new Date(b?.createdAt)
  //       return sortby === "asc" ? dateA - dateB : dateB - dateA
  //     })

  //   const paginatedBookmarks = filteredBookmarks.slice(skip, skip + limit)

  //   return NextResponse.json(
  //     {
  //       success: true,
  //       data: bookmarksList,
  //       message: "Bookmarks fetched successfully",
  //     },
  //     { status: 200 }
  //   )
  // }

  if (favorites === "true") {
    const bookmarks = await db.bookmark.findMany({
      where: {
        userId: payload?.id,
        favorite: true,
      },
      orderBy: {
        createdAt: sortby === "asc" ? "asc" : "desc",
      },
      skip,
      take: limit,
    })

    return NextResponse.json(
      {
        success: true,
        data: bookmarks,
        message: "Bookmarks fetched successfully",
      },
      { status: 200 }
    )
  }

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: payload?.id,
      archive: archive === "true" ? true : false,
    },
    orderBy: {
      createdAt: sortby === "asc" ? "asc" : "desc",
    },
    skip,
    take: limit,
  })

  return NextResponse.json(
    {
      success: true,
      data: bookmarks,
      message: "Bookmarks fetched successfully",
    },
    { status: 200 }
  )
}

// Create new bookmark
export async function POST(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
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

  const { url } = validationResult.data

  let ogData
  await (async () => {
    try {
      const data = await fetchOpenGraphData(url)
      ogData = data
    } catch (error) {
      console.error("Error:", error)
    }
  })()

  let bookmarkPayload = {
    url: url,
    userId: payload?.id,
    ogImage: ogData?.ogImage?.url,
    ogTitle: ogData?.ogTitle,
    ogDescription: ogData?.ogDescription,
  }

  const bookmark = await db.bookmark.create({
    data: bookmarkPayload,
  })

  // try {
  //   await Promise.all([
  //     redis.json.set(
  //       `user:bookmarks:${bookmark?.userId}:${bookmark?.id}`,
  //       "$",
  //       bookmark
  //     ),
  //   ])
  // } catch (error) {
  //   console.log("Failed to create bookmark in redis")
  // }

  return NextResponse.json(
    {
      success: true,
      data: bookmark,
      message: "Bookmark created successfully",
    },
    { status: 200 }
  )
}

// Delete a bookmark
export async function DELETE(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("bookmarkId")

  if (!id) {
    return NextResponse.json(
      { success: false, message: "BookmarkId is missing" },
      { status: 400 }
    )
  }

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

  if (bookmark?.userId !== payload?.id) {
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

// Update bookmark
export async function PUT(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
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

  const { collectionId, bookmarkId } = validationResult.data

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
      collectionId,
    },
  })

  // try {
  //   await redis.json.set(
  //     `user:bookmarks:${updatedBookmark?.userId}:${updatedBookmark?.id}`,
  //     "$.collectionId",
  //     JSON.stringify(collectionId)
  //   )
  // } catch (error) {
  //   console.log("Failed to update in redis")
  // }

  return NextResponse.json(
    {
      success: true,
      data: updatedBookmark,
      message: "Added to collection successfully",
    },
    { status: 200 }
  )
}
