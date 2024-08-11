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
import { useMyBookmarks, useMyCollection } from "@/services/queries"
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  LayoutGrid,
  LayoutList,
  ListFilter,
  Plus,
} from "lucide-react"
import { FC, useState } from "react"
import { Separator } from "@repo/ui/components/separator"
import CollectionCard from "@/components/collection/CollectionCard"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [layoutType, setLayoutType] = useState("grid")

  const collectionsQuery = useMyCollection()
  const collections = collectionsQuery?.data?.data?.data

  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col">
      <div className="py-6 px-8">
        {/* Title and filter */}
        <div className=" flex justify-between items-center mb-5">
          <h2 className=" text-2xl font-semibold">All Collections</h2>

          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center">
                <ArrowUpNarrowWide className="w-6 h-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-1">
                  <ArrowDownWideNarrow className="w-5 h-5" />
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                  <ArrowUpNarrowWide className="w-5 h-5" />
                  Newest first
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="mt-4 mb-8" />

        {/* Collections list */}
        <div className={`${layoutType} grid-cols-4 flex-col gap-5 pt-0`}>
          {collections?.map((collection, index) => (
            <CollectionCard key={index} data={collection} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
