"use client"
import { Card } from "@repo/ui/components/card"
import { Bookmark, Copy, Share, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const CollectionCard = ({ data }) => {
  const { data: session } = useSession()

  return (
    <Card className=" p-3 relative hover:border-primary/50">
      <Image
        src="/dummy.avif"
        width="300"
        height="200"
        alt=""
        className=" w-full h-auto aspect-video mb-2 rounded-md border"
      />
      <div className=" flex items-center justify-between mb-1">
        <Link
          href="/abhishek"
          className=" text-xs font-normal text-muted-foreground z-10">
          By {data?.user?.name}
        </Link>
        <span className=" text-xs font-normal text-muted-foreground">
          15 Mar 2022
        </span>
      </div>
      <h2 className=" font-semibold text-sm min-h-[calc(2*20px)] max-h-[calc(2*20px)] overflow-hidden mb-2">
        {data?.title}
      </h2>
      <p className=" font-normal text-muted-foreground text-xs  min-h-[calc(2*16px)] max-h-[calc(2*16px)] overflow-hidden mb-3">
        {data?.description}
      </p>
      <div className=" flex items-center justify-between gap-2">
        <div className="z-10">
          <span className=" text-xs font-normal bg-primary/10 text-primary py-1 px-2 rounded-full">
            23 Links
          </span>
        </div>
        <div className=" flex items-center gap-3 z-10">
          <Bookmark className=" w-4 h-4 cursor-pointer" />
          <Copy className=" w-4 h-4 cursor-pointer" />
          <Share className=" w-4 h-4 cursor-pointer" />
        </div>
      </div>
      <Link href={`/c/${data?.id}`} className=" absolute inset-0 z-0"></Link>
    </Card>
  )
}

export default CollectionCard
