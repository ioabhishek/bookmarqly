"use client"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { CircleCheck, CircleX } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface LoadingPageProps {
  session: any
}

const OnboardingPage: FC<LoadingPageProps> = ({ session }) => {
  const router = useRouter()

  if (session?.user) {
    router.push(`/${session?.user?.username}`)
  }
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <Card className="p-3 md:p-5 w-[450px]">
        <CardHeader className="p-0 mb-4">
          <CardTitle className=" text-xl">Pick your username</CardTitle>
          <CardDescription>
            The username should be a maximum of 15 characters and contain only
            letters and numbers. Special characters are not allowed.
          </CardDescription>
        </CardHeader>
        <form action="">
          <Input placeholder="Enter username" className="mb-2" />
          <span className=" text-sm text-muted-foreground flex items-center justify-start gap-2">
            <CircleCheck className="w-4 h-4 text-green-600" />
            {/* <CircleX className="w-4 h-4 text-red-600" /> */}
            Username is not available
          </span>
          <Button className="mt-6 w-full">Finish!</Button>
        </form>
      </Card>
    </div>
  )
}

export default OnboardingPage
