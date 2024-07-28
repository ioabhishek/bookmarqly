"use client"
import { buttonVariants } from "@repo/ui/components/button"
import { useUser } from "@/services/queries"
import Link from "next/link"
import { useParams } from "next/navigation"
import UserPage from "@/components/userPage"

const page = () => {
  const params = useParams()
  const data = params?.username

  const getUserQuery = useUser(data)
  const userDetails = getUserQuery?.data?.data?.data

  if (getUserQuery?.isLoading) {
    return (
      <div className=" flex flex-col items-center justify-center h-full gap-5">
        <h3 className=" text-3xl font-bold">Loading...</h3>
      </div>
    )
  }

  return (
    <>
      {getUserQuery?.data?.data?.data ? (
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
        // <div className=" flex flex-col items-center justify-center h-full gap-5">
        //   <Image src="/404.webp" width={400} height={200} alt="404-image" />
        //   <h3 className=" text-3xl font-bold">Why are you here?</h3>
        //   <span className=" text-muted-foreground font-normal text-sm">
        //     You’re not supposed to be here.
        //   </span>
        //   <Link
        //     href="/"
        //     className={`${buttonVariants({
        //       variant: "default",
        //     })} flex items-center gap-2 justify-center`}>
        //     Go Home
        //   </Link>
        // </div>
      )}
    </>
  )
}

export default page
