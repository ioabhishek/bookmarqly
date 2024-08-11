"use client"
import { FC } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Archive, Star } from "lucide-react"

interface ArchiveAddProps {}

const ArchiveAdd: FC<ArchiveAddProps> = ({}) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Archive className=" w-4 h-4 text-muted-foreground mt-1" />
          </TooltipTrigger>
          <TooltipContent>Add to Archive</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ArchiveAdd
