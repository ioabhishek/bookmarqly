"use client"
import { FC } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Tag } from "lucide-react"

interface AddTagProps {}

const AddTag: FC<AddTagProps> = ({}) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Tag className=" w-4 h-4 text-muted-foreground mt-1" />
          </TooltipTrigger>
          <TooltipContent>Add Tag</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default AddTag
