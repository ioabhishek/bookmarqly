"use client"
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
// import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@repo/ui/components/dropdown-menu"
import { useLogout } from "@/services/mutations"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/services/queries"
import { Input } from "@repo/ui/components/input"
import { useSession } from "next-auth/react"
import CreateBookmark from "../bookmark/CreateBookmark"

const AppHeader = () => {
  const currentUserQuery = useCurrentUser({})
  const currentUser = currentUserQuery?.data?.data?.data

  const router = useRouter()

  return (
    <div className=" border-b h-16 px-4 flex items-center w-[calc(100%-280px)] bg-background z-50 fixed top-0">
      <div className="cursor-pointer md:h-auto relative flex items-center justify-center rounded-md gap-2 min-w-[40%] max-w-[25%]">
        <Search className=" md:absolute md:left-3 md:top-1/2 md:transform md:-translate-y-1/2 h-4 w-4 text-secondary-foreground md:stroke-muted-foreground" />
        <Input
          placeholder="Search for collection or links..."
          className="pl-9 cursor-pointer hidden md:block "
          type="search"
        />
      </div>

      {/* {session && <CreateBookmark />}

      <div className="flex items-center gap-3 ml-auto">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-full relative">
              <Avatar className=" w-10 h-10">
                <AvatarImage
                  src={
                    currentUser?.picture
                      ? currentUser?.picture
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
                onClick={handleLogout}
                className="flex items-center gap-2 ">
                <LogOut className="w-4 h-4 text-muted-foreground" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}>
            Login
          </Link>
        )}
      </div> */}
    </div>
  )
}

export default AppHeader
