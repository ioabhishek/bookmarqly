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
import { useTheme } from "next-themes"
import HeaderSearch from "./HeaderSearch"
import { Icons } from "../asset/Icons"

const AppHeader = () => {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const pathname = usePathname()

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <>
      {pathname !== "/" &&
        pathname !== "/signin" &&
        pathname !== "/onboarding" && (
          <header className=" border-b px-3 md:px-4 w-full bg-background fixed top-0 z-40">
            <div className="h-12 md:h-16 flex items-center justify-between gap-3">
              <Link
                href="/home"
                className=" flex items-center gap-2 md:gap-3 md:px-5">
                <Icons.logo className=" w-4 h-4 md:w-5 md:h-5 " />
                <span className=" text-lg font-semibold">Bookmarqly</span>
              </Link>

              <HeaderSearch />

              <div className=" flex items-center gap-3">
                {session?.user && <CreateBookmark />}

                <div
                  className="flex items-center justify-center cursor-pointer h-4 w-4 md:h-9 md:w-9 md:bg-border md:rounded-full"
                  onClick={handleTheme}>
                  {theme === "dark" && <Sun className=" w-4 h-4" />}
                  {theme === "light" && <Moon className="w-4 h-4" />}
                </div>

                <div className="flex items-center gap-3">
                  {session?.user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className=" rounded-full relative">
                        <Avatar className=" w-7 h-7 md:w-9 md:h-9 border shadow-sm">
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
                            {session?.user?.email}
                          </span>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="flex items-center gap-2 ">
                          <CircleUserRound className="w-4 h-4 text-muted-foreground" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem className="flex items-center gap-2 ">
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          <span>Customize</span>
                        </DropdownMenuItem> */}
                        {/* <DropdownMenuItem className="flex items-center gap-2 ">
                          <Zap className="w-4 h-4 text-muted-foreground" />
                          <span>Upgrade</span>
                        </DropdownMenuItem> */}
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
                      href="/signin"
                      className={buttonVariants({ variant: "default" })}>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>
        )}
    </>
  )
}

export default AppHeader
