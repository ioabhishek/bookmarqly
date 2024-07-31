import { FC } from "react"
import SidebarPage from "./SidebarPage"
import { auth } from "@/lib/auth"

const Sidebar = async () => {
  const session = await auth()
  return (
    <div>
      <SidebarPage session={session} />
    </div>
  )
}

export default Sidebar
