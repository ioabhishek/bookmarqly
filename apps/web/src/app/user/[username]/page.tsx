import UsernamePage from "@/components/UsernamePage"
import { auth } from "@/lib/auth"

const page = async () => {
  const session = await auth()

  return (
    <div className="pl-[280px] w-full h-[calc(100%-64px)] flex flex-col">
      <UsernamePage session={session} />
    </div>
  )
}

export default page
