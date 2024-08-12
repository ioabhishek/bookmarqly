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
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
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
  const [sortBy, setSortBy] = useState("desc")

  const myBookmarksQuery = useMyBookmarks(sortBy)
  const myBookmarks = myBookmarksQuery?.data?.data?.data

  const handleSort = async (sort: string) => {
    await setSortBy(sort)
    myBookmarksQuery.refetch()
  }

  return (
    <div className="w-full h-[calc(100%-48px)] md:h-[calc(100%-64px)] flex flex-col">
      <div className="py-4 px-3 md:py-6 md:px-8">
        {/* Title and filter */}
        <div className=" flex justify-between items-center mb-3 md:mb-5">
          <h2 className=" text-2xl font-semibold">Bookmarks</h2>

          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center outline-none">
                {sortBy === "desc" ? (
                  <ArrowUpWideNarrow className="w-6 h-6" />
                ) : (
                  <ArrowDownNarrowWide className="w-6 h-6" />
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={() => handleSort("asc")}>
                  <ArrowDownNarrowWide className="w-5 h-5" />
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={() => handleSort("desc")}>
                  <ArrowUpWideNarrow className="w-5 h-5" />
                  Newest first
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="mt-3 md:mt-4 mb-3 md:mb-8" />

        {/* Bookmark list */}
        <div
          className={`${layoutType} grid-cols-1 md:grid-cols-4 flex-col gap-3 md:gap-5 pt-0`}>
          {myBookmarks?.map((bookmark, index) => (
            <BookmarkCard key={index} data={bookmark} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
