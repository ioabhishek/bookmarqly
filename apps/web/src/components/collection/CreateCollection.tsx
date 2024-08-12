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
import Link from "next/link"
import Image from "next/image"
// import { toast } from "sonner"
import { Button } from "@repo/ui/components/button"
import {
  Copy,
  Edit,
  ExternalLink,
  Loader2,
  Plus,
  PlusCircle,
} from "lucide-react"
import { useCreateBookmark, useCreateCollection } from "@/services/mutations"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Switch } from "@repo/ui/components/switch"
import { Textarea } from "@repo/ui/components/textarea"
import { usePathname } from "next/navigation"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { UploadButton } from "@/utils/uploadthing"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"

interface EditCollectionPopupProps {
  titleText: string
}

interface CollectionData {
  name: string
  description: string
}

const CreateCollection: FC<EditCollectionPopupProps> = ({ titleText }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [loading, setLoading] = useState(false)

  const form = useForm({})

  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState

  const createCollectionMutation = useCreateCollection()

  const onSubmit = async (data: CollectionData) => {
    setLoading(true)
    const newCollection = {
      name: data?.name,
      description: data?.description,
    }

    try {
      const response = await createCollectionMutation.mutateAsync(newCollection)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        reset({ name: "", description: "" })
        // toast.success(response?.data?.message)
      }
    } catch (error) {
      setLoading(false)
      setOpen(false)
      // toast.error("something went wrong")
    }
  }

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn)
  }

  const handlePreview = () => {
    setIsHidden(!isHidden)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className=" flex items-center gap-2">
              <Plus className=" w-5 h-5 mt-1" />
              {titleText}
            </TooltipTrigger>
            <TooltipContent>Create collection</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Create collection</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="name" className="mb-2">
              Collection name
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
              placeholder="Enter collection name"
            />
            {errors?.name?.message && (
              <p className=" text-xs text-red-500">{errors?.name?.message}</p>
            )}
          </div>

          {/* description */}
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              className="min-h-28"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
                maxLength: {
                  value: 400,
                  message: "Description cannot exceed 200 characters",
                },
              })}
              placeholder="Enter description"
            />
            {errors?.description?.message && (
              <p className=" text-xs text-red-500">
                {errors?.description?.message}
              </p>
            )}
          </div>

          {/* thumbnail */}
          {/* <div className="grid w-full items-center gap-1.5 mb-6">
            <Label
              htmlFor="thumbnail"
              className="mb-2 flex items-center justify-between">
              Thumbnail
              <span className=" text-xs text-muted-foreground">
                Image up to 4MB max
              </span>
            </Label>
            <UploadButton
              className="ut-button:w-full ut-allowed-content:hidden"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0]?.url)
                // console.log("Files: ", res[0]?.url)
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`)
              }}
            />
            {imageUrl && (
              <Link
                href={imageUrl}
                target="__blank"
                className="relative flex items-center justify-between gap-2 border rounded-md p-2 mt-2">
                <span className=" text-xs">{imageUrl}</span>
                <ExternalLink className=" min-w-4 h-4" />
              </Link>
            )}
          </div> */}

          {/* privacy */}
          {/* <div className="grid w-full items-center gap-1.5 mb-6">
            <div className=" flex gap-8 items-start justify-between">
              <div className=" flex flex-col ">
                <Label htmlFor="isPublic" className="mb-2">
                  Enable sharing
                </Label>
                <p className=" text-xs text-muted-foreground">
                  By turning this on, everyone with link can access.
                </p>
              </div>
              <Switch
                checked={isSwitchOn}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div> */}

          <Button type="submit" className=" w-full">
            {/* {loading ? "Creating collection..." : "Create Collection"} */}
            {loading ? (
              <>
                Creating <Loader2 className="animate-spin w-4 h-4 ml-2" />
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCollection
