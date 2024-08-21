import { db } from "@/lib/db"
import { verifyToken } from "@/utils/jwtVerification"
import { createBookmarkSchema, updateBookmarkSchema } from "@/utils/validations"
import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import axios from "axios"

interface BookmarkPayload {
  url: string
  userId: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  note?: string
  collectionId?: string
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

  const { url, note, collectionId } = validationResult.data

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })

  const $ = cheerio.load(html)

  let bookmarkPayload: BookmarkPayload = {
    url: url,
    userId: payload?.id ?? "",
    ogTitle: $('meta[property="og:title"]').attr("content") ?? "",
    ogDescription: $('meta[property="og:description"]').attr("content") ?? "",
    ogImage: $('meta[property="og:image"]').attr("content") ?? "",
  }

  if (note) {
    bookmarkPayload.note = note
  }

  if (collectionId) {
    bookmarkPayload.collectionId = collectionId
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
