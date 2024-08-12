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
import {
  useArticleBookmark,
  useFavoriteBookmarks,
  useMyBookmarks,
} from "@/services/queries"
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

  const articleBookmarksQuery = useArticleBookmark(sortBy)
  const articleBookmarks = articleBookmarksQuery?.data?.data?.data

  const handleSort = async (sort: string) => {
    await setSortBy(sort)
    articleBookmarksQuery.refetch()
  }

  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col">
      <div className="py-6 px-8">
        {/* Title and filter */}
        <div className=" flex justify-between items-center mb-5">
          <h2 className=" text-2xl font-semibold">Articles</h2>

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
        <Separator className="mt-4 mb-8" />

        {/* Bookmark list */}
        <div className={`${layoutType} grid-cols-4 flex-col gap-5 pt-0`}>
          {articleBookmarks?.map((bookmark, index) => (
            <BookmarkCard key={index} data={bookmark} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
