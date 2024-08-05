import Homepage from "@/components/Homepage"
import UserHomepage from "@/components/UserHomepage"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
  return (
    <>
      {session?.user ? (
        <div className="pl-[280px] w-full h-[calc(100%-64px)] flex flex-col">
          <UserHomepage session={session} />
        </div>
      ) : (
        <Homepage />
      )}
    </>
  )
}
