"use client"
import { FC } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { ListPlus } from "lucide-react"

interface AddCollectionProps {}

const AddCollection: FC<AddCollectionProps> = ({}) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <ListPlus className=" w-4 h-4 text-muted-foreground mt-1" />
          </TooltipTrigger>
          <TooltipContent>Add to Collection</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default AddCollection
