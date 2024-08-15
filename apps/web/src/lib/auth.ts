import { db } from "./db"
import NextAuth from "next-auth"
import { cookies } from "next/headers"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { generateJWT } from "@/utils/token.utils"
import { redis } from "./redis"
// import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
// import { Redis } from "@upstash/redis"

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_URL!,
//   token: process.env.UPSTASH_REDIS_TOKEN!,
// })

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  adapter: PrismaAdapter(db),
  // adapter: UpstashRedisAdapter(redis),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const accessToken = await generateJWT({
        id: user?.id,
      })
      cookies().set("accessToken", accessToken, { maxAge: 365 * 24 * 60 * 60 })

      try {
        await redis.json.set(`user:${user?.id}`, "$", user)
      } catch (error) {
        console.log("Failed to create user in redis")
      }

      return true
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  debug: true,
})
