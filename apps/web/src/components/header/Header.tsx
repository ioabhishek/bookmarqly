import Link from "next/link"
import { FC } from "react"
import { ArrowUpRight } from "lucide-react"
import { Icons } from "../asset/Icons"
import { auth } from "@/lib/auth"

interface HeaderProps {}

const Header: FC<HeaderProps> = async ({}) => {
  const session = await auth()

  return (
    <header className=" w-full border-b bg-background/40 backdrop-blur-lg sticky top-0 z-50 ">
      <div className=" max-w-screen-2xl h-16 flex items-center m-auto md:px-8 px-0 relative">
        <Link href="/" className=" flex items-center gap-4">
          <Icons.logo className="w-6 h-6" />
          <span className=" text-xl font-semibold">Bookmarqly</span>
        </Link>

        <nav className=" flex items-center gap-8 border px-6 py-1.5 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-sm z-10">
          <Link href="/" className=" text-base font-medium hover:opacity-70">
            Home
          </Link>
          <Link
            href="/explore"
            className=" text-base font-medium hover:opacity-70">
            Explore
          </Link>
          <Link
            href="/features"
            className=" text-base font-medium hover:opacity-70">
            Features
          </Link>
          <Link
            href="/pricing"
            className=" text-base font-medium hover:opacity-70">
            Pricing
          </Link>
        </nav>

        <div className="ml-auto"></div>

        {session?.user ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-medium">
            Sign In
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
