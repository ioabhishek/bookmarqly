import LoadingPage from "@/components/LoadingPage"
import { auth } from "@/lib/auth"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await auth()

  return <LoadingPage session={session} />
}

export default page
