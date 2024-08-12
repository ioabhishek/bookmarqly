"use client"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { Icons } from "../asset/Icons"
import {
  Archive,
  ArrowRight,
  Bookmark,
  Download,
  Globe,
  Highlighter,
  Home,
  Moon,
  Newspaper,
  PanelLeft,
  SquareLibrary,
  Star,
  Sun,
  Tag,
  Tags,
  Youtube,
} from "lucide-react"
import { useTheme } from "next-themes"
import CreateCollection from "../collection/CreateCollection"
import axiosPublic from "@/hooks/useAxios"
import { COLLECTION } from "@/utils/Endpoints"
import { useMyCollection } from "@/services/queries"
import { Separator } from "@repo/ui/components/separator"
import { usePathname } from "next/navigation"

interface SidebarProps {
  session: any
}

const SidebarPage: FC<SidebarProps> = ({ session }) => {
  const pathname = usePathname()

  const collectionsQuery = useMyCollection()
  const collections = collectionsQuery?.data?.data?.data

  return (
    <aside className=" min-w-[280px] max-w-[280px] overflow-hidden flex flex-col h-[calc(100vh-64px)] sticky top-16 order-r z-20 border-r">
      <div className="py-6 px-5 flex-1 flex flex-col overflow-y-auto">
        {/* Main list */}
        <div className=" flex flex-col">
          {/* <Link
            href="/home"
            className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/home" && "bg-border rounded-md"}`}>
            <div className=" flex items-center gap-3">
              <Home className=" w-5 h-5" />
              <span className=" text-sm">Home</span>
            </div>
          </Link> */}
          <Link
            href="/bookmarks"
            className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks" && "bg-border rounded-md"}`}>
            <div className=" flex items-center gap-3">
              <Bookmark className=" w-5 h-5" />
              <span className=" text-sm">Bookmarks</span>
            </div>
          </Link>
          <Link
            href="/collections"
            className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/collections" && "bg-border rounded-md"}`}>
            <div className=" flex items-center gap-3">
              <SquareLibrary className=" w-5 h-5" />
              <span className=" text-sm">Collections</span>
            </div>
          </Link>
          <Link
            href="/highlights"
            className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/highlights" && "bg-border rounded-md"}`}>
            <div className=" flex items-center gap-3">
              <Highlighter className=" w-5 h-5" />
              <span className=" text-sm">Highlights</span>
            </div>
          </Link>
        </div>

        <Separator className="my-5" />

        {/* Filters */}
        <div>
          <h2 className=" text-sm md:text-base font-normal text-muted-foreground mb-4 px-3 ">
            Filters
          </h2>

          <div className=" flex flex-col">
            <Link
              href="/bookmarks/archive"
              className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks/archive" && "bg-border rounded-md"}`}>
              <div className=" flex items-center gap-3">
                <Archive className=" w-5 h-5" />
                <span className=" text-sm">Archive</span>
              </div>
            </Link>
            <Link
              href="/bookmarks/favorites"
              className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks/favorites" && "bg-border rounded-md"}`}>
              <div className=" flex items-center gap-3">
                <Star className=" w-5 h-5" />
                <span className=" text-sm">Favorites</span>
              </div>
            </Link>
            <Link
              href="/bookmarks/articles"
              className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks/articles" && "bg-border rounded-md"}`}>
              <div className=" flex items-center gap-3">
                <Newspaper className=" w-5 h-5" />
                <span className=" text-sm">Articles</span>
              </div>
            </Link>
            <Link
              href="/bookmarks/videos"
              className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks/videos" && "bg-border rounded-md"}`}>
              <div className=" flex items-center gap-3">
                <Youtube className=" w-5 h-5" />
                <span className=" text-sm">Videos</span>
              </div>
            </Link>
            <Link
              href="/bookmarks/tags"
              className={`flex items-center justify-between px-3 py-2.5 ${pathname === "/bookmarks/videos" && "bg-border rounded-md"}`}>
              <div className=" flex items-center gap-3">
                <Tag className=" w-5 h-5" />
                <span className=" text-sm">Tags</span>
              </div>
            </Link>
          </div>
        </div>

        <Separator className="my-5" />

        {/* My collections */}
        <div>
          <div className=" flex justify-between items-center mb-4">
            <h2 className=" text-sm md:text-base font-normal text-muted-foreground pl-3">
              My Collections
            </h2>
            <CreateCollection />
          </div>

          {/* collection list */}
          <div className=" flex flex-col gap-3 mb-4">
            {collections?.slice(0, 5).map((collection: any) => (
              <Link
                key={collection?.id}
                href={`/collections/${collection?.id}`}
                className="flex items-center justify-between px-3">
                <div className=" text-sm flex items-center gap-3 text-muted-foreground">
                  {collection?.name}
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/collections"
            className=" text-xs flex font-normal items-center gap-1 ml-3 px-3 py-1 border border-blue-600 rounded-full w-fit">
            View all
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* <Separator className="my-5" /> */}

        {/* Tags */}
        {/* <div className="mb-8">
          <span className=" text-sm md:text-base font-normal text-muted-foreground px-3">
            Tags
          </span>

          <div className=" flex flex-col gap-3">
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
        </div> */}

        <div className="flex-1"></div>

        {/* <Link
        href="/explore"
        className=" flex items-center justify-center text-base font-normal dark:font-medium gap-2 border shadow-md rounded-md py-3 px-2">
        Download
        <Download className=" w-4 h-4" />
      </Link> */}
      </div>
    </aside>
  )
}

export default SidebarPage
