"use client"
import BookmarkCard from "@/components/bookmark/BookmarkCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { useMyBookmarks } from "@/services/queries"
import {
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  LayoutGrid,
  LayoutList,
  ListFilter,
  Plus,
} from "lucide-react"
import { useState } from "react"
import { Separator } from "@repo/ui/components/separator"

const page = () => {
  const [layoutType, setLayoutType] = useState("grid")

  const myBookmarksQuery = useMyBookmarks()
  const myBookmarks = myBookmarksQuery?.data?.data?.data

  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col">
      <div className="py-6 px-8">
        <div className=" flex justify-between items-center mb-5">
          <h2 className=" text-2xl font-semibold">All Bookmarks</h2>

          <div className=" flex items-center gap-2 ml-auto cursor-pointer">
            <Plus className=" w-5 h-5" />
            Create bookmark
          </div>

          {/* <div className="flex items-center  border p-1 rounded-md">
            <div className="border p-1 rounded-sm">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div className="border p-1 rounded-sm">
              <LayoutList className="w-4 h-4" />
            </div>
          </div> */}

          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center">
                <ArrowUpWideNarrow className="w-6 h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Type 1</DropdownMenuItem>
                <DropdownMenuItem>Type 2</DropdownMenuItem>
                <DropdownMenuItem>Type 3</DropdownMenuItem>
                <DropdownMenuItem>Type 4</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-4" />

        <div className={`${layoutType} grid-cols-4 flex-col gap-5 pt-0`}>
          {myBookmarks?.map((bookmark, index) => (
            <BookmarkCard key={index} data={bookmark} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
