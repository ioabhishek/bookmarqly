"use client"
import { FC } from "react"
import { useUser, useUserDetails } from "@/services/queries"
import { buttonVariants } from "@repo/ui/components/button"
import Link from "next/link"
import UserPage from "@/components/userPage"
import { usePathname } from "next/navigation"

interface UserHomepageProps {
  session: Object
}

const UsernamePage: FC<UserHomepageProps> = ({ session }) => {
  const pathname = usePathname()
  const userDetailsQuery = useUser(pathname.split("/")[2])
  const userDetails = userDetailsQuery?.data?.data?.data

  if (userDetailsQuery?.isLoading) {
    return (
      <div className=" flex flex-col items-center justify-center h-screen flex-1 gap-5">
        <h3 className=" text-3xl font-bold">Loading...</h3>
      </div>
    )
  }

  return (
    <div>
      {userDetailsQuery?.data?.data?.data ? (
        <UserPage userDetails={userDetails} />
      ) : (
        <div className=" flex flex-col items-center justify-center h-full gap-5">
          <h3 className=" text-3xl font-bold">User not found</h3>
          <span className=" text-muted-foreground font-normal text-sm">
            Make sure you typed the right username.
          </span>
          <Link
            href="/"
            className={`${buttonVariants({
              variant: "default",
            })} flex items-center gap-2 justify-center`}>
            Go Home
          </Link>
        </div>
      )}
    </div>
  )
}

export default UsernamePage
