import { FC } from "react"
import SidebarPage from "./SidebarPage"
import { auth } from "@/lib/auth"
import SidebarChild from "./SidebarChild"

const Sidebar = async () => {
  const session = await auth()
  return <SidebarChild session={session} />
}

export default Sidebar
