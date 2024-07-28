"use client"
import {
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

const page = () => {
  const params = useParams()
  const collectionId = params?.c

  const singleCollectionQuery = useSingleCollection(collectionId)
  const singleCollection = singleCollectionQuery?.data?.data?.data

  return (
    <div className="w-full p-6">
      {/* Page Title & Actions */}
      <Card className=" flex items-start p-3 z-50 gap-4 mb-8">
        <Image
          // src="/dummy.avif"
          src={singleCollection?.thumbnail}
          width="300"
          height="200"
          alt=""
          className=" w-[280px] h-auto aspect-video rounded-md border"
        />
        <div className=" flex flex-col gap-1 w-full">
          <div className=" flex justify-between items-center mb-1">
            <h2 className=" flex items-center gap-2 text-3xl font-semibold">
              {singleCollection?.title}
            </h2>
            <div className=" flex items-center gap-2">
              <CreateBookmarkPopup collectionId={collectionId} />
              <EditCollectionPopup collectionId={collectionId} />
              <DeleteCollectionPopup collectionId={collectionId} />
              <CollectionShare collectionId={collectionId} />
            </div>
          </div>

          <span className=" w-fit text-xs font-normal bg-primary/10 text-primary py-1 px-2 rounded-full">
            {singleCollection?.isPublic ? "Public" : "Private"}
          </span>

          <p className=" text-sm font-normal mb-1 text-muted-foreground">
            {singleCollection?.description}
          </p>

          <div className=" flex items-center justify-start mb-2 gap-4">
            <Link
              href={`/${singleCollection?.user?.username}`}
              className=" text-xs font-normal text-muted-foreground z-10">
              By @{singleCollection?.user?.username}
            </Link>
            <span className=" text-xs font-normal text-muted-foreground">
              15 Mar 2022
            </span>
          </div>
        </div>
      </Card>

      {/* title and sorting filter */}
      <div className=" flex items-center justify-between mb-8">
        <h2 className=" text-3xl font-bold ">
          Bookmarks ({singleCollection?.bookmark?.length})
        </h2>

        <div className=" ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className=" border h-10 w-10 rounded-md flex items-center justify-center">
              <ListFilter className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Type 1</DropdownMenuItem>
              <DropdownMenuItem>Type 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/*Bookmarks listing */}
      {singleCollection?.bookmark?.length > 0 ? (
        <div className={`grid grid-cols-4 flex-col gap-4`}>
          {singleCollection?.bookmark?.map((bookmark, index) => (
            <BookmarkCard key={index} data={bookmark} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">No Bookmarks yet</div>
      )}
    </div>
  )
}

export default page
