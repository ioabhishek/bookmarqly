"use client"
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  Bookmark,
  Copy,
  Delete,
  Edit,
  LayoutGrid,
  List,
  ListFilter,
  Plus,
  Share,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import BookmarkCard from "@/components/bookmark/BookmarkCard"
import Image from "next/image"
import { Card } from "@repo/ui/components/card"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useSingleCollection } from "@/services/queries"
import CreateBookmarkPopup from "@/components/bookmark/CreateBookmarkPopup"
import EditCollectionPopup from "@/components/collection/EditCollectionPopup"
import DeleteCollectionPopup from "@/components/collection/DeleteCollectionPopup"
import CollectionShare from "@/components/collection/CollectionShare"
import { Separator } from "@repo/ui/components/separator"
import { useState } from "react"

const page = () => {
  const params = useParams()
  const collectionId = params?.collectionId
  const [sortBy, setSortBy] = useState("desc")

  const payload = {
    collectionId,
    sortBy,
  }

  const singleCollectionQuery = useSingleCollection(payload)
  const collection = singleCollectionQuery?.data?.data?.data

  const handleSort = async (sort: string) => {
    await setSortBy(sort)
    singleCollectionQuery.refetch()
  }

  return (
    <div className="w-full h-[calc(100%-64px)]">
      <div className="p-6">
        {/* Page Title & Actions */}
        <div>
          <div className=" mb-4">
            <h2 className=" text-2xl font-semibold mb-1 min-h-[calc(1*32px)] max-h-[calc(1*32px)] overflow-hidden">
              {collection?.name}
            </h2>
            <p className=" text-muted-foreground text-sm font-normal min-h-[calc(2*20px)] max-h-[calc(2*20px)] overflow-hidden">
              {collection?.description}
            </p>
          </div>

          <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-8">
              <CreateBookmarkPopup collectionId={collectionId} />
              <EditCollectionPopup collectionId={collectionId} />
              <DeleteCollectionPopup collectionId={collectionId} />
              {/* <CollectionShare collectionId={collectionId} /> */}
            </div>
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
        </div>
        <Separator className="mt-4 mb-8" />

        {/*Bookmarks listing */}
        {collection?.bookmarks?.length > 0 ? (
          <div className={`grid grid-cols-4 flex-col gap-4`}>
            {collection?.bookmarks?.map((bookmark, index) => (
              <BookmarkCard key={index} data={bookmark} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            No Bookmarks yet
          </div>
        )}
      </div>
    </div>
  )
}

export default page
