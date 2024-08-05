import {
  BACKEND_URL,
  CREATE_UPDATE_USER,
  USER_DETAILS,
} from "@/utils/Endpoints"
import axios from "axios"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { cookies } from "next/headers"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  providers: [Google],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user is", user)
      if (user) {
        const payload = {
          name: user.name,
          email: user.email,
          image: user.image,
        }

        const response = await axios.post(
          `${BACKEND_URL}${CREATE_UPDATE_USER}`,
          payload
        )
        cookies().set("accessToken", response?.data?.accessToken)
      }
      return true
    },
    // async session({ session, token }) {
    //   const response = await axios.get(`${BACKEND_URL}${USER_DETAILS}`)

    //   console.log(response)
    //   return session
    // },
  },
})
