import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createCollectionSchema } from "@/utils/validations"
import { NextResponse } from "next/server"

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
