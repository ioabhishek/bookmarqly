"use client"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface HeaderCtaProps {
  session: Object
}

const HeaderCta: FC<HeaderCtaProps> = ({ session }) => {
  return (
    <div>
      {session?.user ? (
        <Link href="/bookmarks" className=" flex items-center justify-center ">
          <Image
            src={session?.user?.image}
            width={30}
            height={30}
            alt="profile_pic"
            className=" rounded-full border"
          />
        </Link>
      ) : (
        <Link
          href="/signin"
          className="flex items-center gap-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white px-4 py-1.5 rounded-full">
          Sign In
        </Link>
      )}
    </div>
  )
}

export default HeaderCta
