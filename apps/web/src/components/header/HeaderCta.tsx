"use client"
import axiosPublic from "@/hooks/useAxios"
import { BACKEND_URL, USER_DETAILS } from "@/utils/Endpoints"
import axios from "axios"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FC, useEffect, useState } from "react"

interface HeaderCtaProps {
  session: Object
}

const HeaderCta: FC<HeaderCtaProps> = ({ session }) => {
  const [username, setUsername] = useState()
  const fetchUser = async () => {
    const response = await axiosPublic.get(`${BACKEND_URL}${USER_DETAILS}`)
    setUsername(response?.data?.data?.username)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      {session?.user ? (
        <Link
          href={`/${username ? username : "onboarding"}`}
          className=" flex items-center justify-center gap-2 border p-1 rounded-full">
          <Image
            src={session?.user?.image}
            width={30}
            height={30}
            alt="profile_pic"
            className=" rounded-full border"
          />
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm font-medium">
          Sign In
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

export default HeaderCta
