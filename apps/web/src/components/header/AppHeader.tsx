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
import { signOut, useSession } from "next-auth/react"
import CreateBookmark from "../bookmark/CreateBookmark"
import { usePathname } from "next/navigation"

const AppHeader = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <>
      {pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/onboarding" && (
          <div className="border-b h-16 px-4 flex items-center justify-between w-full bg-background sticky top-0 z-10">
            {/* <HeaderSearch /> */}
            {/* {session?.user && <CreateBookmark />} */}

            <div className="flex items-center gap-3 ml-auto">
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className=" rounded-full relative">
                    <Avatar className=" w-9 h-9 border shadow-sm">
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
                    <DropdownMenuLabel className="flex flex-col items-start">
                      <span>{session?.user?.name}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        @ioabhishek
                      </span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="flex items-center gap-2 ">
                      <CircleUserRound className="w-4 h-4 text-muted-foreground" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 ">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span>Customize</span>
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
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default" })}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
    </>
  )
}

export default AppHeader
