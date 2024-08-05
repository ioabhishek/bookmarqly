"use client"
import axiosPublic from "@/hooks/useAxios"
import { BACKEND_URL, USER_DETAILS, USERNAME } from "@/utils/Endpoints"
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
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface LoadingPageProps {
  session: any
}

const OnboardingPage: FC<LoadingPageProps> = () => {
  const [user, setUser] = useState()
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<any>({ success: false, message: "" })
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosPublic.get(`${BACKEND_URL}${USER_DETAILS}`)
      setUser(response?.data?.data)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (user?.username) {
      router.push(`/`)
    }
  }, [user, router])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInputText(value)
    if (value) {
      const response = await axiosPublic.get(`${USERNAME}?u=${value}`)
      setMessage(response?.data)
    } else {
      setMessage({ success: false, message: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    const payload = {
      username: inputText,
    }
    const response = await axiosPublic.post(`${USERNAME}`, payload)
    setIsLoading(false)
    if (response?.data?.success) {
      router.push(`/${inputText}`)
    }
  }

  return (
    <div className=" w-full h-screen flex items-center justify-center">
      {!user?.username ? (
        <Card className="p-3 md:p-5 w-[450px]">
          <CardHeader className="p-0 mb-4">
            <CardTitle className=" text-xl">Pick your username</CardTitle>
            <CardDescription>
              The username should be a maximum of 15 characters and contain only
              letters and numbers. Special characters and spaces are not
              allowed.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Enter username"
              className="mb-2"
              onChange={(e) => handleChange(e)}
            />

            {inputText && (
              <span
                className={`text-sm ${message?.success ? "text-green-600" : "text-red-600"} flex items-center justify-start gap-2`}>
                {message?.message}
              </span>
            )}
            <Button
              className="mt-4 w-full"
              type="submit"
              disabled={!message?.success}>
              {isLoading ? (
                <>
                  Finishing <Loader className="w-4 h-4 animate-spin" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </form>
        </Card>
      ) : (
        "Redirecting to dashboard..."
      )}
    </div>
  )
}

export default OnboardingPage
