// import ogs from "open-graph-scraper"
import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"

export const getBookmarks = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to view bookmarks",
      },
      401
    )
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: payload?.id,
    },
  })

  return c.json(
    {
      success: true,
      data: bookmarks,
      message: "Bookmarks fetched successfully",
    },
    201
  )
}

export const createBookmark = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to create bookmark",
      },
      401
    )
  }

  const { title, url, note, collectionId } = c.req.valid("json")

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!collection) {
    return c.json(
      { success: false, message: "Please create a collection first" },
      404
    )
  }

  // const options = { url }
  // let ogImage, ogTitle, ogDescription

  // try {
  //   const { result } = await ogs(options)
  //   ogImage = result?.ogImage[0]?.url
  //   ogTitle = result?.ogTitle
  //   ogDescription = result?.ogDescription
  // } catch (error) {
  //   console.error("Error fetching Open Graph data:", error)
  // }

  // console.log(ogImage)

  const bookmark = await prisma.bookmark.create({
    data: {
      title: title,
      url: url,
      note: note,
      collectionId: collectionId,
      userId: payload.id,
      // ogImage,
      // ogTitle,
      // ogDescription,
    },
  })

  return c.json(
    {
      success: true,
      data: bookmark,
      message: "Bookmark created successfully",
    },
    201
  )
}

export const updateBookmark = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to update a bookmark",
      },
      401
    )
  }

  const { title, url, note, bookmarkId } = c.req.valid("json")

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: bookmarkId,
    },
  })

  if (!bookmark) {
    return c.json({ success: false, message: "No bookmark found" }, 404)
  }

  const updatedBookmark = await prisma.bookmark.update({
    where: {
      id: bookmarkId,
    },
    data: {
      title: title,
      url: url,
      note: note,
    },
  })

  return c.json(
    {
      success: true,
      data: updatedBookmark,
      message: "Bookmark updated successfully",
    },
    201
  )
}

export const deleteBookmark = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to delete bookmark",
      },
      401
    )
  }

  const bookmarkId = c.req.param("id")

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: bookmarkId,
    },
  })

  if (!bookmark) {
    return c.json({ success: false, message: "No bookmark found" }, 404)
  }

  if (bookmark?.userId !== payload.id) {
    return c.json(
      {
        success: false,
        message: "You are not authorized to delete this bookmark",
      },
      401
    )
  }

  await prisma.bookmark.delete({
    where: {
      id: bookmarkId,
    },
  })

  return c.json(
    { success: true, message: "Bookmark deleted successfully" },
    200
  )
}

export const singleBookmark = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to view bookmark",
      },
      401
    )
  }

  const bookmarkId = c.req.param("id")

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: bookmarkId,
    },
  })

  if (payload.id === bookmark?.userId) {
    if (!bookmark) {
      return c.json(
        {
          success: false,
          message: "No bookmark found",
        },
        401
      )
    } else {
      return c.json(
        {
          success: true,
          data: bookmark,
          message: "Bookmark details fetched successfully",
        },
        200
      )
    }
  } else {
    return c.json(
      {
        success: false,
        message: "You are not authorized to access this bookmark",
      },
      401
    )
  }
}
