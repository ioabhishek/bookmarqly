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
// import { toast } from "sonner"
import { Button } from "@repo/ui/components/button"
import { Edit, ExternalLink, Loader2, Plus } from "lucide-react"
import { useCreateBookmark, useUpdateCollection } from "@/services/mutations"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Switch } from "@repo/ui/components/switch"
import axiosPublic from "@/hooks/useAxios"
import { COLLECTION } from "@/utils/Endpoints"
import { Textarea } from "@repo/ui/components/textarea"
// import { UploadButton } from "@/utils/uploadthing"
import Link from "next/link"
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
  collectionId: string
}

interface CollectionData {
  name: string
  description: string
  collectionId: string
}

const EditCollectionPopup: FC<EditCollectionPopupProps> = ({
  collectionId,
}) => {
  const [open, setOpen] = useState(false)
  // const [imageUrl, setImageUrl] = useState("")
  // const [isSwitchOn, setIsSwitchOn] = useState(false)
  // const [isHidden, setIsHidden] = useState(true)
  // const [thumbnail, setThumbnail] = useState()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: async () => {
      const response = await axiosPublic.get(`${COLLECTION}/${collectionId}`)
      const data = response?.data?.data
      // setThumbnail(data?.thumbnail)
      // setIsSwitchOn(data?.isPublic)

      return {
        name: data?.name,
        description: data?.description,
      }
    },
    mode: "onTouched",
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const updateCollectionMutation = useUpdateCollection()

  const onSubmit = async (data: CollectionData) => {
    setLoading(true)
    const newCollection = {
      name: data?.name,
      description: data?.description,
      collectionId: collectionId,
    }

    try {
      const response = await updateCollectionMutation.mutateAsync(newCollection)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        // toast.success(response?.data?.message)
      }
    } catch (error) {
      setLoading(false)
      setOpen(false)
      // toast.error("something went wrong")
    }
  }

  // const handleSwitchChange = () => {
  //   setIsSwitchOn(!isSwitchOn)
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Edit className=" w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>Edit collection</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Edit Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
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
                console.log("Files: ", res[0]?.url)
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`)
              }}
            />
            {(imageUrl || thumbnail) && (
              <Link
                href={imageUrl}
                target="__blank"
                className="relative flex items-center justify-between gap-2 border rounded-md p-2 mt-2">
                <span className=" text-xs break-words">
                  {imageUrl || thumbnail}
                </span>
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
            {loading ? (
              <>
                Updating <Loader2 className="animate-spin w-4 h-4 ml-2" />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCollectionPopup
