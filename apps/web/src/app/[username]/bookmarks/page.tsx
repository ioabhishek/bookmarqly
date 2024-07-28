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
import { Label } from "@repo/ui/components/label"
import { ListFilter } from "lucide-react"
import { useState } from "react"

const page = () => {
  const [layoutType, setLayoutType] = useState("grid")
  const myBookmarksQuery = useMyBookmarks()
  const myBookmarks = myBookmarksQuery?.data?.data?.data
  console.log(myBookmarks)

  return (
    <div className="w-full p-5">
      <div className=" flex justify-between items-start mb-5">
        <h2 className=" text-3xl font-semibold">All Bookmarks</h2>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" border h-10 w-10 rounded-md flex items-center justify-center">
              <ListFilter className="w-4 h-4" />
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

      <div className={`${layoutType} grid-cols-4 flex-col gap-5 pt-0`}>
        {myBookmarks?.map((bookmark, index) => (
          <BookmarkCard key={index} data={bookmark} />
        ))}
      </div>
    </div>
  )
}

export default page
