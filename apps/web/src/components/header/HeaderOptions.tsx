"use client"
import { FC } from "react"
import {
  Bell,
  CircleUserRound,
  LogOut,
  Moon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Sun,
  Zap,
} from "lucide-react"
Input
import { Button, buttonVariants } from "@repo/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import Link from "next/link"
import { Input } from "@repo/ui/components/input"
import { signOut } from "next-auth/react"
import CreateBookmark from "../bookmark/CreateBookmark"

interface HeaderOptionsProps {
  session: Object
}

const HeaderOptions: FC<HeaderOptionsProps> = ({ session }) => {
  return (
    <div className="flex items-center gap-3">
      {session?.user && <CreateBookmark />}
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className=" rounded-full relative">
            <Avatar className=" w-10 h-10">
              <AvatarImage
                src={
                  session?.user?.image
                    ? session?.user?.image
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2 ">
              <CircleUserRound className="w-4 h-4 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 ">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 ">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span>Upgrade</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 ">
              <LogOut className="w-4 h-4 text-muted-foreground" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" className={buttonVariants({ variant: "default" })}>
          Login
        </Link>
      )}
    </div>
  )
}

export default HeaderOptions
