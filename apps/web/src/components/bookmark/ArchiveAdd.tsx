"use client"
import { FC, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Archive, Star } from "lucide-react"
import { useArchiveBookmark, useFavoriteBookmark } from "@/services/mutations"

interface ArchiveAddProps {
  archive: boolean
  bookmarkId: string
}

const ArchiveAdd: FC<ArchiveAddProps> = ({ archive, bookmarkId }) => {
  const favoriteQuery = useArchiveBookmark()

  const payload = {
    bookmarkId: bookmarkId,
    archive: !archive,
  }

  const handleFavorite = async () => {
    await favoriteQuery.mutateAsync(payload)
  }

  return (
    <div className=" flex items-center justify-center">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Archive
              className=" w-4 h-4 text-muted-foreground mt-1"
              onClick={handleFavorite}
            />
          </TooltipTrigger>
          <TooltipContent>Add to Archive</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ArchiveAdd
