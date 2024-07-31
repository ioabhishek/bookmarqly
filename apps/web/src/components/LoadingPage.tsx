"use client"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface LoadingPageProps {
  session: any
}

const LoadingPage: FC<LoadingPageProps> = ({ session }) => {
  const router = useRouter()

  if (session?.user) {
    router.push(`/${session?.user?.username}`)
  }
  return <div className=" flex items-center justify-center">Redirecting...</div>
}

export default LoadingPage
