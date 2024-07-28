"use client"
import Image from "next/image"
import { Button } from "@repo/ui/components/button"
import { signIn } from "next-auth/react"

const GoogleLogin = () => {
  return (
    <Button className="w-full" onClick={() => signIn("google")}>
      <Image
        src="/google.png"
        width={18}
        height={18}
        alt="google logo"
        className="mr-2"
      />
      Google
    </Button>
  )
}

export default GoogleLogin

{
  /* <Button onClick={() => signOut()}>Signout</Button> */
}
