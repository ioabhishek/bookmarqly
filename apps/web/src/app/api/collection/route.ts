import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import {
  createCollectionSchema,
  updateCollectionPricacySchema,
  updateCollectionSchema,
} from "@/utils/validations"
import { verifyToken } from "@/utils/jwtVerification"

// Get my collection list
export async function GET(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const sortby = url.searchParams.get("sortby")

  const collection = await db.collection.findMany({
    where: {
      userId: payload?.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: {
          bookmarks: true,
        },
      },
    },
    orderBy: {
      createdAt: sortby === "asc" ? "asc" : "desc",
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: collection,
      message: "Collection list fetched successfully",
    },
    { status: 200 }
  )
}

// Create a collection
export async function POST(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
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

  const { name, description } = validationResult.data

  const user = await db.user.findUnique({
    where: {
      id: payload?.id,
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
      name: name,
      description: description,
      userId: payload?.id,
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
export async function PUT(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
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

  const { name, description, isPublic, collectionId } = validationResult.data

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

  if (isCollection?.userId !== payload?.id) {
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
      name,
      description,
      isPublic,
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

// Delete a collection
export async function DELETE(req: NextRequest) {
  const { error, status, payload } = await verifyToken(req)

  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("collectionId")

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Collection ID is missing" },
      { status: 400 }
    )
  }

  const isCollection = await db.collection.findUnique({
    where: {
      id,
    },
  })

  if (!isCollection) {
    return NextResponse.json(
      { success: false, message: "No Collection found" },
      { status: 404 }
    )
  }

  if (isCollection?.userId !== payload?.id) {
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

// Update collection privacy
// export async function PATCH(req: NextRequest) {
//   const { error, status, payload } = await verifyToken(req)

//   if (error) {
//     return NextResponse.json({ success: false, message: error })
//   }

//   const jsonRequest = await req.json()

//   const validationResult = updateCollectionPricacySchema.safeParse(jsonRequest)

//   if (!validationResult.success) {
//     const errors = validationResult.error.errors.map((err) => ({
//       path: err.path.join("."),
//       message: err.message,
//     }))

//     return NextResponse.json(
//       { success: false, message: "Validation error", errors: errors },
//       { status: 400 }
//     )
//   }

//   const { isPublic, collectionId } = validationResult.data

//   const isCollection = await db.collection.findUnique({
//     where: {
//       id: collectionId,
//     },
//   })

//   if (!isCollection) {
//     return NextResponse.json(
//       { success: false, message: "No Collection found" },
//       { status: 404 }
//     )
//   }

//   if (isCollection?.userId !== payload?.id) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "You are not authorized to update this collection",
//       },
//       { status: 403 }
//     )
//   }

//   const updateCollection = await db.collection.update({
//     where: {
//       id: collectionId,
//     },
//     data: {
//       isPublic: isPublic,
//     },
//   })

//   return NextResponse.json(
//     {
//       success: true,
//       data: updateCollection,
//       message: "Collection privacy updated successfully",
//     },
//     { status: 200 }
//   )
// }
