import { verifyJWT } from "@/utils/token.utils"
import { NextRequest, NextResponse } from "next/server"

export async function verifyToken(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value

  if (!token) {
    return { error: "No access token found", status: 401 }
  }

  try {
    const payload = await verifyJWT(token)

    if (payload) {
      return { payload }
    } else {
      return { error: "Invalid or expired JWT", status: 401 }
    }
  } catch (err) {
    console.error("Error verifying JWT:", err)
    return { error: "Failed to verify JWT", status: 500 }
  }
}
