"use client"
import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"

const page = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <div>
      <div>
        {session?.user ? (
          <button onClick={() => signOut()}>Google Logout</button>
        ) : (
          <button onClick={() => signIn("google")}>Google Login</button>
        )}
      </div>
    </div>
  )
}

export default page
