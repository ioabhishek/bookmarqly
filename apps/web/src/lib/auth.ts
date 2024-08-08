import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"

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
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      // console.log("session token is", token)
      return session
    },
  },
  debug: true,
})
