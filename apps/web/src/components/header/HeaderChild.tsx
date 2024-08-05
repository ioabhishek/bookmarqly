"use client"
import { FC } from "react"
import Link from "next/link"
import { Icons } from "../asset/Icons"
import { auth } from "@/lib/auth"
import HeaderCta from "./HeaderCta"
import HeaderOptions from "./HeaderOptions"
import HeaderSearch from "./HeaderSearch"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

interface HeaderChildProps {
  session: { user: any } | null
}

const HeaderChild: FC<HeaderChildProps> = ({ session }) => {
  const pathname = usePathname()

  return (
    <>
      {pathname !== "/login" && pathname !== "/onboarding" && (
        <header className=" w-full border-b bg-background/40 backdrop-blur-lg sticky top-0 z-50 ">
          <div className=" max-w-screen-2xl h-16 flex items-center m-auto md:px-6 px-0 relative justify-between">
            <Link href="/" className=" flex items-center gap-3">
              <Icons.logo className="w-5 h-5 " />
              <span className=" text-lg font-semibold">Bookmarqly</span>
            </Link>

            {!session?.user ? (
              <nav className=" flex items-center gap-8 border px-6 py-1.5 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-sm z-10">
                <Link
                  href="/"
                  className=" text-base font-medium hover:opacity-70">
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
            ) : (
              <HeaderSearch />
            )}

            {/* <div className="ml-auto"></div> */}
            <HeaderOptions session={session} />

            {/* <HeaderCta session={session} /> */}
          </div>
        </header>
      )}
    </>
  )
}

export default HeaderChild
