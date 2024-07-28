import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  const users = await db.user.findMany()

  if (!session?.user) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  return NextResponse.json({ success: true, session: session }, { status: 200 })
}

// export async function POST(req) {

// }
