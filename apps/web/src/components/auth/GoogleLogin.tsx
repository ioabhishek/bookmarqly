"use client"
import Image from "next/image"
import { Button } from "@repo/ui/components/button"
import { signIn } from "next-auth/react"
// import { auth, signIn } from "@/lib/auth"

const GoogleLogin = async () => {
  // const session = await auth()

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={() => signIn("google", { callbackUrl: "/bookmarks" })}>
      <Image
        src="/google.png"
        width={18}
        height={18}
        alt="google logo"
        className="mr-2"
      />
      Google
    </Button>
    // <form
    //   action={async () => {
    //     "use server"
    //     await signIn("google", { callbackUrl: "/onboarding" })
    //   }}>
    //   <Button className="w-full" type="submit">
    //     <Image
    //       src="/google.png"
    //       width={18}
    //       height={18}
    //       alt="google logo"
    //       className="mr-2"
    //     />
    //     Google
    //   </Button>
    // </form>
  )
}

export default GoogleLogin
