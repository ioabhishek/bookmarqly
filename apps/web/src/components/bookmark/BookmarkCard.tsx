"use client"
import {
  Copy,
  Delete,
  ExternalLink,
  LucideCircleEllipsis,
  Share,
  ShieldEllipsisIcon,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Icons } from "../asset/Icons"
import { format, parseISO } from "date-fns"
import DeleteBookmark from "./DeleteBookmark"
import EditBookmark from "./EditBookmark"
import { Separator } from "@repo/ui/components/separator"
import ArchiveAdd from "./ArchiveAdd"
import FavoriteAdd from "./FavoriteAdd"
import AddTag from "./AddTag"
import AddCollection from "./AddCollection"

const BookmarkCard = ({ data }) => {
  const baseUrl = new URL(data?.url).origin.split("://")[1]

  return (
    <Card className=" p-3 relative hover:shadow-lg hover:bg-">
      <div className="relative">
        <Image
          src={data?.ogImage ? data?.ogImage : "/dummy.avif"}
          width="1280"
          height="720"
          alt="favicon"
          className="w-full aspect-video h-auto mb-4 rounded-md border"
        />
        <span className="flex items-center gap-1 absolute top-1.5 right-1.5 text-xs font-semibold text-black mb-1 py-1 px-2 rounded-[8px] bg-white shadow-xl">
          {baseUrl}
          <ExternalLink className=" w-3 h-3" />
        </span>
      </div>

      <h2 className=" font-semibold text-sm min-h-[calc(2*20px)] max-h-[calc(2*20px)] overflow-hidden mb-2">
        {data?.title ? data?.title : data?.ogTitle}
      </h2>

      <p className=" text-xs text-muted-foreground min-h-[calc(2*16px)] max-h-[calc(2*16px)] overflow-hidden mb-4">
        {data?.note ? data?.note : data?.ogDescription}
      </p>

      <div className="relative z-30 grid grid-cols-5 gap-4">
        <AddCollection />
        <FavoriteAdd />
        <ArchiveAdd />
        <AddTag />
        {/* <EditBookmark bookmarkId={data?.id} /> */}
        <DeleteBookmark bookmarkId={data?.id} />
      </div>

      <Link
        href={data?.url}
        className=" absolute inset-0 z-0"
        target="blank"></Link>
    </Card>
  )
}

export default BookmarkCard

{
  /* <Link
          href="/shopping"
          className=" text-xs font-normal bg-red-600/30 text-primary py-1 px-2 rounded-full">
          Shopping
        </Link> */
}
{
  /* <div className="z-10">
          <span className=" text-xs font-normal text-muted-foreground">
            {formattedDate}
          </span>
        </div> */
}
