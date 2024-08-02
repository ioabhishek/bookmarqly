import OnboardingPage from "@/components/OnboardingPage"
import { auth } from "@/lib/auth"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await auth()

  return (
    <div className="w-full h-screen">
      <OnboardingPage session={session} />
    </div>
  )
}

export default page
