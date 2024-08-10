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
      {pathname === "/" && (
        <header className="h-12 p-2 w-[60%] mx-auto bg-background/20 backdrop-blur-lg fixed top-6 z-50 border rounded-full left-1/2 transform -translate-x-1/2">
          <div className="  flex items-center m-auto  relative justify-between">
            <Link href="/" className=" flex items-center gap-2 ml-4">
              <Icons.logo className="w-5 h-5 " />
              <span className=" text-lg font-semibold">Bookmarqly</span>
            </Link>

            <nav className=" flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 z-10">
              <Link
                href="/"
                className=" text-sm text-muted-foreground font-normal hover:text-secondary-foreground">
                Home
              </Link>
              <Link
                href="/features"
                className=" text-sm text-muted-foreground font-normal hover:text-secondary-foreground">
                Features
              </Link>
              <Link
                href="/pricing"
                className=" text-sm text-muted-foreground font-normal hover:text-secondary-foreground">
                Pricing
              </Link>
            </nav>

            <HeaderCta session={session} />
          </div>
        </header>
      )}
    </>
  )
}

export default HeaderChild
