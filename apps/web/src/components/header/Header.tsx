import { FC } from "react"
import { auth } from "@/lib/auth"
import HeaderChild from "./HeaderChild"

interface HeaderProps {}

const Header: FC<HeaderProps> = async ({}) => {
  const session = await auth()

  return <HeaderChild session={session} />
}

export default Header
