import UserHomepage from "@/components/HomeUser"
import { auth } from "@/lib/auth"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await auth()

  return (
    <>
      {session?.user && (
        <div className="w-full h-[calc(100%-64px)] flex flex-col">
          <UserHomepage session={session} />
        </div>
      )}
    </>
  )
}

export default page
