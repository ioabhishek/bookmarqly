"use client"
import { FC, useState } from "react"
import { ListFilter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import CollectionCard from "@/components/collection/CollectionCard"

const UserPage = ({ userDetails }) => {
  const [layoutType, setLayoutType] = useState("grid")

  return (
    <div className="w-full p-5">
      <div className=" flex justify-between items-start mb-5">
        <h2 className=" text-3xl font-semibold">All Collections</h2>
        {/* <div className=" border flex items-center rounded-md overflow-hidden  ml-auto mr-3">
          <div
            className={`h-10 text-sm  flex  items-center justify-center px-3 cursor-pointer ${
              contentType === "Bookmarks" ? "bg-primary/10" : null
            }`}
            onClick={() => setContentType("Bookmarks")}>
            Bookmarks
          </div>
          <div
            className={`h-10 text-sm  flex  items-center justify-center px-3 cursor-pointer ${
              contentType === "Collections" ? "bg-primary/10" : null
            }`}
            onClick={() => setContentType("Collections")}>
            Collections
          </div>
        </div> */}
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
        {userDetails?.collection?.map((collection: any, index) => (
          <CollectionCard data={collection} key={index} />
        ))}
      </div>
    </div>
  )
}

export default UserPage
