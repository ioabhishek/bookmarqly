"use client"
import { FC } from "react"
import SidebarPage from "./SidebarPage"
import { usePathname } from "next/navigation"

interface SidebarChildProps {
  session: { user: any } | null
}

const SidebarChild: FC<SidebarChildProps> = ({ session }) => {
  const pathname = usePathname()
  return (
    <>
      {pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/onboarding" && (
          <>{session?.user && <SidebarPage session={session} />}</>
        )}
    </>
  )
}

export default SidebarChild
