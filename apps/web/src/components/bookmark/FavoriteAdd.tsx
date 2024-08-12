"use client"
import { FC, useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Archive, Star } from "lucide-react"
import { useFavoriteBookmark } from "@/services/mutations"

interface FavoriteAddProps {
  favorite: boolean
  bookmarkId: string
}

const FavoriteAdd: FC<FavoriteAddProps> = ({ favorite, bookmarkId }) => {
  const [isFavorite, setIsFavorite] = useState(favorite)

  const favoriteQuery = useFavoriteBookmark()

  const payload = {
    bookmarkId: bookmarkId,
    favorite: !favorite,
  }

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite)
    await favoriteQuery.mutateAsync(payload)
  }

  return (
    <div className=" flex items-center justify-center">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Star
              className={` w-4 h-4 text-muted-foreground mt-1 ${favorite && "stroke-orange-500"}`}
              onClick={handleFavorite}
            />
          </TooltipTrigger>
          <TooltipContent>Add to Favorites</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default FavoriteAdd
