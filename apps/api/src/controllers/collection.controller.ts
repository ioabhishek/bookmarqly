import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"

export const getCollection = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const decodedPayload = c.get("decodedPayload")

  const isMy = c.req.query("my")

  if (isMy) {
    if (!decodedPayload?.id) {
      return c.json(
        {
          success: false,
          message: "You must be logged in to get my collections",
        },
        401
      )
    } else {
      const collection = await prisma.collection.findMany({
        where: {
          userId: decodedPayload?.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
          isPublic: true,
          _count: {
            select: {
              bookmark: true,
            },
          },
        },
      })

      return c.json(
        {
          success: true,
          data: collection,
          message: "Collection list fetched successfully",
        },
        201
      )
    }
  } else {
    const collection = await prisma.collection.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        isPublic: true,
        _count: {
          select: {
            bookmark: true,
          },
        },
      },
    })

    return c.json(
      {
        success: true,
        data: collection,
        message: "Collection list fetched successfully",
      },
      201
    )
  }
}

export const createCollection = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to create a collection",
      },
      401
    )
  }

  const { title, description, thumbnail, isPublic } = c.req.valid("json")

  const collection = await prisma.collection.create({
    data: {
      title: title,
      description: description,
      thumbnail: thumbnail,
      isPublic: isPublic,
      userId: payload?.id,
    },
  })

  return c.json(
    {
      success: true,
      data: collection,
      message: "Collection created successfully",
    },
    201
  )
}

export const updateCollection = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      401
    )
  }

  const { title, description, thumbnail, isPublic, collectionId } =
    c.req.valid("json")

  const isCollection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!isCollection) {
    return c.json({ success: false, message: "No Collection found" }, 404)
  }

  if (isCollection?.userId !== payload?.id) {
    return c.json(
      {
        success: false,
        message: "You are not authorized to update this collection",
      },
      403
    )
  }

  const updateCollection = await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      title: title,
      description: description,
      thumbnail: thumbnail,
      isPublic: isPublic,
    },
  })

  return c.json(
    {
      success: true,
      data: updateCollection,
      message: "Collection updated successfully",
    },
    200
  )
}

export const updatePrivacy = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      401
    )
  }

  const { isPublic, collectionId } = c.req.valid("json")

  const isCollection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!isCollection) {
    return c.json({ success: false, message: "No Collection found" }, 404)
  }

  if (isCollection?.userId !== payload.id) {
    return c.json(
      {
        success: false,
        message: "You are not authorized to update this collection",
      },
      403
    )
  }

  const updateCollection = await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      isPublic: isPublic,
    },
  })

  return c.json(
    {
      success: true,
      data: updateCollection,
      message: "Collection privacy updated successfully",
    },
    200
  )
}

export const deleteCollection = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")

  if (!payload?.id) {
    return c.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      401
    )
  }

  const collectionId = c.req.param("id")

  const isCollection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!isCollection) {
    return c.json({ success: false, message: "No Collection found" }, 404)
  }

  if (isCollection?.userId !== payload.id) {
    return c.json(
      {
        success: false,
        message: "You are not authorized to delete this collection",
      },
      403
    )
  }

  await prisma.bookmark.deleteMany({
    where: {
      collectionId,
    },
  })

  await prisma.collection.delete({
    where: {
      id: collectionId,
    },
  })

  return c.json(
    { success: true, message: "Collection deleted successfully" },
    200
  )
}

export const singleCollection = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const payload = c.get("decodedPayload")
  const collectionId = c.req.param("id")

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      isPublic: true,
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
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  })

  if (!collection) {
    return c.json({ success: false, message: "No collection found" }, 404)
  }

  if (collection?.isPublic) {
    return c.json(
      {
        success: true,
        data: collection,
        message: "Collection details fetched successfully",
      },
      200
    )
  } else {
    if (collection?.user?.id === payload.id) {
      return c.json(
        {
          success: true,
          data: collection,
          message: "Collection details fetched successfully",
        },
        200
      )
    } else {
      return c.json(
        {
          success: false,
          message: "You are not authorized to access this collection",
        },
        401
      )
    }
  }
}
