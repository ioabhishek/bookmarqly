import UserHomepage from "@/components/UserHomepage"
import { auth } from "@/lib/auth"

const page = async () => {
  const session = await auth()

  return <UserHomepage session={session} />
}

export default page
