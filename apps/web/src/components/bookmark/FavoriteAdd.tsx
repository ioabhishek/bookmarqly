"use client"
import { FC } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Archive, Star } from "lucide-react"

interface FavoriteAddProps {}

const FavoriteAdd: FC<FavoriteAddProps> = ({}) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Star className=" w-4 h-4 text-muted-foreground mt-1" />
          </TooltipTrigger>
          <TooltipContent>Add to Favorites</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default FavoriteAdd
