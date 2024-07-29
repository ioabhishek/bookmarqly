import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  createCollectionSchema,
  updateCollectionPricacySchema,
  updateCollectionSchema,
} from "@/utils/validations"
import { NextResponse } from "next/server"

// Get my or public collection list
export async function GET(req: Request) {
  const session = await auth()

  const url = new URL(req.url)

  const isMy = url.searchParams.get("my")

  if (isMy) {
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to get my collections",
        },
        { status: 401 }
      )
    }

    const collection = await db.collection.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        isPublic: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: collection,
        message: "Collection list fetched successfully",
      },
      { status: 201 }
    )
  } else {
    const collection = await db.collection.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        isPublic: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: collection,
        message: "Collection list fetched successfully",
      },
      { status: 201 }
    )
  }
}

// Create a collection
export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to create a collection",
      },
      { status: 401 }
    )
  }

  const jsonRequest = await req.json()

  const validationResult = createCollectionSchema.safeParse(jsonRequest)

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

  const { title, description, thumbnail, isPublic } = validationResult.data

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User does not exist" },
      { status: 400 }
    )
  }

  const collection = await db.collection.create({
    data: {
      title: title,
      description: description,
      thumbnail: thumbnail,
      isPublic: isPublic,
      userId: session.user.id,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: collection,
      message: "Collection created successfully",
    },
    { status: 201 }
  )
}

// Update a collection
export async function PUT(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      { status: 401 }
    )
  }

  const jsonRequest = await req.json()

  const validationResult = updateCollectionSchema.safeParse(jsonRequest)

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

  const { title, description, thumbnail, isPublic, collectionId } =
    validationResult.data

  const isCollection = await db.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!isCollection) {
    return NextResponse.json(
      { success: false, message: "No Collection found" },
      { status: 404 }
    )
  }

  if (isCollection?.userId !== session.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to update this collection",
      },
      { status: 403 }
    )
  }

  const updateCollection = await db.collection.update({
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

  return NextResponse.json(
    {
      success: true,
      data: updateCollection,
      message: "Collection updated successfully",
    },
    { status: 200 }
  )
}

// Update collection privacy
export async function PATCH(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      { status: 401 }
    )
  }

  const jsonRequest = await req.json()

  const validationResult = updateCollectionPricacySchema.safeParse(jsonRequest)

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

  const { isPublic, collectionId } = validationResult.data

  const isCollection = await db.collection.findUnique({
    where: {
      id: collectionId,
    },
  })

  if (!isCollection) {
    return NextResponse.json(
      { success: false, message: "No Collection found" },
      { status: 404 }
    )
  }

  if (isCollection?.userId !== session.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to update this collection",
      },
      { status: 403 }
    )
  }

  const updateCollection = await db.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      isPublic: isPublic,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: updateCollection,
      message: "Collection privacy updated successfully",
    },
    { status: 200 }
  )
}

// Delete a collection
export async function DELETE(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "You must be logged in to update a collection",
      },
      { status: 401 }
    )
  }

  const { id } = await req.json()

  const isCollection = await db.collection.findUnique({
    where: {
      id: id,
    },
  })

  if (!isCollection) {
    return NextResponse.json(
      { success: false, message: "No Collection found" },
      { status: 404 }
    )
  }

  if (isCollection?.userId !== session.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to delete this collection",
      },
      { status: 403 }
    )
  }

  await db.bookmark.deleteMany({
    where: {
      collectionId: id,
    },
  })

  await db.collection.delete({
    where: {
      id: id,
    },
  })

  return NextResponse.json(
    { success: true, message: "Collection deleted successfully" },
    { status: 200 }
  )
}
