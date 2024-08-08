import { db } from "./db"
import NextAuth from "next-auth"
import { cookies } from "next/headers"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { JWTPayload, SignJWT, importJWK } from "jose"

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
  pages: {
    signIn: "login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  adapter: PrismaAdapter(db),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const accessToken = await generateJWT({
        id: user?.id,
      })
      cookies().set("accessToken", accessToken)
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
