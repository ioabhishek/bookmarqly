import { prisma } from "@/lib/db"
import { connectToDatabase } from "@/utils/server-helpers"

export async function GET() {
  await connectToDatabase()
  return new Response({ message: "OK" })
  // const users = await prisma.user.findMany()
  // return new Response(JSON.stringify(users))
}
