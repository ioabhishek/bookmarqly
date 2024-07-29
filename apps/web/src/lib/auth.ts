import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { JWTPayload, SignJWT, importJWK } from "jose"
import { db } from "./db"
import { cookies } from "next/headers"
import { generateFromEmail, generateUsername } from "unique-username-generator"

export interface session extends Session {
  user: {
    id: string
    accessToken: string
    email: string
    name: string
  }
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.AUTH_SECRET || "secret"
  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" })
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk)
  return jwt
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  adapter: PrismaAdapter(db),
  providers: [Google],
  debug: true,
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        const accessToken = await generateJWT({
          id: token?.sub,
          name: token?.name,
          email: token?.email,
          image: token?.picture,
        })
        const username = generateFromEmail(token?.email, 3)

        // cookies().set("authjs.access-token", accessToken)

        const dbUser = await db.user.findUnique({
          where: {
            id: token?.sub,
          },
        })

        if (!dbUser?.username) {
          await db.user.update({
            where: {
              id: token?.sub,
            },
            data: {
              username,
            },
          })
        }

        session.user.id = token.sub
        session.user.username = dbUser?.username
        session.user.accessToken = accessToken
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      return "/dashboard"
    },
  },
})
