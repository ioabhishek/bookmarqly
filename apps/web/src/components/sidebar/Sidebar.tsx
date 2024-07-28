"use client"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { Icons } from "../asset/Icons"
import { Bookmark, Download, Globe, Home, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import CreateCollection from "../collection/CreateCollection"
import axiosPublic from "@/hooks/useAxios"
import { CURRENT_USER } from "@/utils/Endpoints"

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { theme, setTheme } = useTheme()
  const [username, setUsername] = useState("")
  const [collections, setCollections] = useState([])

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const fetchUser = async () => {
    const response = await axiosPublic.post(CURRENT_USER, {
      isCollection: true,
    })
    setUsername(response?.data?.data?.username)
    setCollections(response?.data?.data?.collection)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <aside className=" min-w-[280px] max-w-[280px] overflow-hidden flex flex-col fixed top-0 left-0  border-r h-full">
      <div className=" flex justify-between items-center  border-b  min-h-16 px-5 ">
        <Link href="/" className=" flex items-center gap-3">
          <Icons.logo className="w-5 h-5 " />
          <span className=" text-lg font-semibold">Bookmarqly</span>
        </Link>
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleTheme}>
          {theme === "dark" && <Sun className=" w-4 h-4 md:w-5 md:h-5" />}
          {theme === "light" && <Moon className="w-4 h-4 md:w-5 md:h-5" />}
        </div>
      </div>

      <div className=" flex flex-col p-5  overflow-y-auto h-full">
        <div className=" flex flex-col gap-3 mb-10">
          <Link
            href={`/${username}`}
            className="flex items-center justify-between text-muted-foreground">
            <div className=" flex items-center gap-3">
              <Home className=" w-4 h-4" />
              <span className=" text-sm">Home</span>
            </div>
          </Link>
          <Link
            href={`/${username}/bookmarks`}
            className="flex items-center justify-between text-muted-foreground">
            <div className=" flex items-center gap-3">
              <Bookmark className=" w-4 h-4" />
              <span className=" text-sm">All Bookmarks</span>
            </div>
            <span className=" text-xs text-muted-foreground">130</span>
          </Link>
          {/* <Link
            href={`/${username}/saved`}
            className="flex items-center justify-between text-muted-foreground">
            <div className=" flex items-center gap-3">
              <Bookmark className=" w-4 h-4" />
              <span className=" text-sm">Saved</span>
            </div>
            <span className=" text-xs text-muted-foreground">30</span>
          </Link>
          <Link
            href={`/${username}/favourite`}
            className="flex items-center justify-between text-muted-foreground">
            <div className=" flex items-center gap-3">
              <Star className="w-4 h-4" />
              <span className=" text-sm">Favourite</span>
            </div>
            <span className=" text-xs text-muted-foreground">53</span>
          </Link> */}
          <Link
            href={`/${username}/explore`}
            className="flex items-center justify-between text-muted-foreground">
            <div className=" flex items-center gap-3">
              <Globe className=" w-4 h-4" />
              <span className=" text-sm">Explore</span>
            </div>
            <span className=" text-xs text-muted-foreground">14872</span>
          </Link>

          {/* <CreateBookmark /> */}
        </div>

        <div>
          <div className=" flex justify-between items-center mb-4">
            <span className=" text-sm font-semibold">MY COLLECTIONS</span>
            <CreateCollection />
          </div>

          {/* collection list */}
          <div className=" flex flex-col gap-3 mb-6">
            {collections?.map((collection: any) => (
              <Link
                key={collection?.id}
                href={`/${username}/c/${collection?.id}`}
                className="flex items-center justify-between">
                <div className=" text-sm flex items-center gap-3 text-muted-foreground">
                  {collection?.title}
                </div>
                <span className=" text-xs text-muted-foreground">74</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1"></div>

        <Link
          href="/abhishek/explore"
          className=" flex items-center justify-center text-base font-normal dark:font-medium gap-2 border shadow-md rounded-md py-3 px-2">
          Download
          <Download className=" w-4 h-4" />
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
