"use client"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { Icons } from "../asset/Icons"
import {
  Bookmark,
  Download,
  Globe,
  Home,
  Moon,
  SquareLibrary,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import CreateCollection from "../collection/CreateCollection"
import axiosPublic from "@/hooks/useAxios"
import { COLLECTION } from "@/utils/Endpoints"
import { useMyCollection } from "@/services/queries"

interface SidebarProps {
  session: any
}

const SidebarPage: FC<SidebarProps> = ({ session }) => {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const collectionsQuery = useMyCollection()
  const collections = collectionsQuery?.data?.data?.data

  return (
    <aside className=" min-w-[280px] max-w-[280px] overflow-hidden flex flex-col fixed top-16 left-0 p-5 border-r h-[calc(100%-64px)] overflow-y-auto">
      <div className=" flex flex-col gap-3 mb-10">
        <Link
          href={`/`}
          className="flex items-center justify-between text-muted-foreground">
          <div className=" flex items-center gap-3">
            <SquareLibrary className=" w-4 h-4" />
            <span className=" text-sm">Collections</span>
          </div>
          <span className=" text-xs text-muted-foreground">
            {collections?.length}
          </span>
        </Link>
        <Link
          href={`/bookmarks`}
          className="flex items-center justify-between text-muted-foreground">
          <div className=" flex items-center gap-3">
            <Bookmark className=" w-4 h-4" />
            <span className=" text-sm">Bookmarks</span>
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
        {/* <Link
          href={`/explore`}
          className="flex items-center justify-between text-muted-foreground">
          <div className=" flex items-center gap-3">
            <Globe className=" w-4 h-4" />
            <span className=" text-sm">Explore</span>
          </div>
          <span className=" text-xs text-muted-foreground">14872</span>
        </Link> */}

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
              href={`/c/${collection?.id}`}
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
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={handleTheme}>
        {theme === "dark" && <Sun className=" w-4 h-4 md:w-5 md:h-5" />}
        {theme === "light" && <Moon className="w-4 h-4 md:w-5 md:h-5" />}
      </div>

      {/* <Link
        href="/explore"
        className=" flex items-center justify-center text-base font-normal dark:font-medium gap-2 border shadow-md rounded-md py-3 px-2">
        Download
        <Download className=" w-4 h-4" />
      </Link> */}
    </aside>
  )
}

export default SidebarPage
