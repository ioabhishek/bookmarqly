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
import { Button } from "@repo/ui/components/button"
import { Copy, Edit, ExternalLink, Plus, SquarePen } from "lucide-react"
import {
  useCreateBookmark,
  useUpdateBookmark,
  useUpdateCollection,
} from "@/services/mutations"
// import { toast } from "sonner"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Switch } from "@repo/ui/components/switch"
import axiosPublic from "@/hooks/useAxios"
import { SINGLE_BOOKMARK, SINGLE_COLLECTION } from "@/utils/Endpoints"
import { Textarea } from "@repo/ui/components/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"

interface EditBookmarkProps {
  bookmarkId: string
}

interface CollectionData {
  title: string
  url: string
  note: string
  bookmarkId: string
}

const EditBookmark: FC<EditBookmarkProps> = ({ bookmarkId }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: async () => {
      const response = await axiosPublic.get(`${SINGLE_BOOKMARK}${bookmarkId}`)
      const data = response?.data?.data

      return {
        title: data?.title,
        url: data?.url,
        note: data?.note,
      }
    },
    mode: "onTouched",
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const updateBookmarkMutation = useUpdateBookmark()

  const onSubmit = async (data: CollectionData) => {
    setLoading(true)
    const bookmarkData = {
      title: data?.title,
      url: data?.url,
      note: data?.note,
      bookmarkId: bookmarkId,
    }

    try {
      const response = await updateBookmarkMutation.mutateAsync(bookmarkData)
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
      <DialogTrigger className="flex items-center">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <SquarePen className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Update Bookmark</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              {...register("title")}
              placeholder="Bookmark title"
            />
          </div>

          {/* url */}
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="url" className="mb-2">
              URL
            </Label>
            <Input
              type="text"
              id="url"
              {...register("url", {
                required: {
                  value: true,
                  message: "url is required",
                },
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                  message: "Enter a valid URL",
                },
              })}
              placeholder="Bookmark url"
            />
            {errors?.url?.message && (
              <p className=" text-xs text-red-500">{errors?.url?.message}</p>
            )}
          </div>

          {/* note */}
          <div className="grid w-full items-center gap-1.5 mb-6">
            <Label htmlFor="note" className="mb-2">
              Note
            </Label>
            <Textarea
              id="note"
              {...register("note")}
              placeholder="Add a note to your bookmark"
            />
          </div>
          <Button type="submit" className=" w-full">
            {loading ? "Updating bookmark..." : "Update bookmark"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditBookmark
