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
import { Plus } from "lucide-react"
import { useCreateBookmark } from "@/services/mutations"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Button } from "@repo/ui/components/button"

interface CreateBookmarkProps {
  collectionId: string
}
interface BookmarkData {
  title: string
  url: string
  note: string
  collectionId: string
}

const CreateBookmarkPopup: FC<CreateBookmarkProps> = ({ collectionId }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState
  const createBookmarkMutation = useCreateBookmark()

  const onSubmit = async (data: BookmarkData) => {
    setLoading(true)
    const newBookmark = {
      title: data?.title,
      url: data?.url,
      note: data?.note,
      collectionId: collectionId,
    }

    try {
      const response = await createBookmarkMutation.mutateAsync(newBookmark)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        reset({ url: "" })
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
      <DialogTrigger>
        <div className=" flex items-center justify-center w-8 h-8 rounded-sm border border-white/30 cursor-pointer">
          <Plus className=" w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Create Bookmark</DialogTitle>
          <DialogDescription>
            Note: Title, Thumbnail and Description will be automatically picked
            from URL which you can change/update later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          {/* <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              {...register("title")}
              placeholder="Bookmark title"
            />
          </div> */}

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
          {/* <div className="grid w-full items-center gap-1.5 mb-6">
            <Label htmlFor="notes" className="mb-2">
              Note
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Add a note to your bookmark"
            />
          </div> */}
          <Button type="submit" className=" w-full">
            {loading ? "Creating bookmark..." : "Create bookmark"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBookmarkPopup
