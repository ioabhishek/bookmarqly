import Link from "next/link"
import { Icons } from "@/components/asset/Icons"
import GoogleLogin from "@/components/auth/GoogleLogin"

const page = () => {
  return (
    <div className="w-full md:grid md:grid-cols-2 h-[100vh]">
      <div className="hidden bg-muted md:flex justify-center items-center">
        <Link href="/" className=" flex items-center gap-3">
          <Icons.logo className="w-7 h-7 animate-bounce" />
          <span className=" text-3xl font-semibold">Bookmarqly</span>
        </Link>
      </div>

      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className=" text-sm text-muted-foreground">
              Log in to access your account
            </p>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  )
}

export default page
