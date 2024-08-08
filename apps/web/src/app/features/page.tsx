"use client"
import { useSession } from "next-auth/react"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { data: session } = useSession()

  console.log("user session data is", session)
  return <div>features page</div>
}

export default page
