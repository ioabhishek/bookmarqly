import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

type Params = {
  username: string
}

export async function GET(request: Request, context: { params: Params }) {
  const username = context.params.username

  const session = await auth()

  const selectFields = {
    name: true,
    email: true,
    image: true,
    username: true,
  }

  if (session?.user) {
    selectFields.collection = {}
  } else {
    selectFields.collection = {
      where: {
        isPublic: true,
      },
    }
  }

  const findUser = await db.user.findUnique({
    where: {
      username: username,
    },
    select: selectFields,
  })

  if (!findUser) {
    return NextResponse.json(
      { success: false, message: "User does not exist" },
      { status: 404 }
    )
  }

  return NextResponse.json({ success: true, data: findUser }, { status: 200 })
}
