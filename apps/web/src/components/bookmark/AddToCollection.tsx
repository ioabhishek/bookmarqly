"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@repo/ui/components/dialog"
import { BookmarkPlus, Loader2, Plus } from "lucide-react"
import { useCreateBookmark, useUpdateBookmark } from "@/services/mutations"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
// import { toast } from "sonner"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Textarea } from "@repo/ui/components/textarea"
import { Button } from "@repo/ui/components/button"
import CollectionList from "./CollectionList"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { ListPlus } from "lucide-react"

interface AddToCollectionProps {
  bookmarkId: string
}
interface BookmarkData {
  title: string
  url: string
  note: string
  collectionId: string
}

const AddToCollection: FC<AddToCollectionProps> = ({ bookmarkId }) => {
  const [id, setId] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState
  const updateBookmarkMutation = useUpdateBookmark()

  const onSubmit = async (data: BookmarkData) => {
    setLoading(true)

    const payload = {
      collectionId: id,
      bookmarkId: bookmarkId,
    }

    try {
      const response = await updateBookmarkMutation.mutateAsync(payload)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        // toast.success(response?.data?.message)
      }
    } catch (error) {
      setLoading(false)
      setOpen(false)
      // toast.error("something went wrong. Please try again🙏")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <ListPlus className=" w-4 h-4 text-muted-foreground mt-1" />
            </TooltipTrigger>
            <TooltipContent>Add to Collection</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>

      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Add to Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="url" className="mb-2">
              Collection
            </Label>
            <CollectionList id={id} setId={setId} />
          </div>

          <Button type="submit" className="w-full">
            {loading ? (
              <>
                Adding <Loader2 className="animate-spin w-4 h-4 ml-2" />
              </>
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCollection
