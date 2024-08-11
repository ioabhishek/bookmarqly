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
import { Button, buttonVariants } from "@repo/ui/components/button"
import { Copy, Share } from "lucide-react"
import { useUpdateCollectionPrivacy } from "@/services/mutations"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Switch } from "@repo/ui/components/switch"
import axiosPublic from "@/hooks/useAxios"
import { COLLECTION } from "@/utils/Endpoints"
import { Label } from "@repo/ui/components/label"
import { useSession } from "next-auth/react"

interface CollectionShareProps {
  collectionId: string
}

interface CollectionData {
  isPublic: boolean
}

const CollectionShare: FC<CollectionShareProps> = ({ collectionId }) => {
  const [open, setOpen] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  const form = useForm({
    defaultValues: async () => {
      const response = await axiosPublic.get(`${COLLECTION}/${collectionId}`)
      const data = response?.data?.data
      setIsSwitchOn(data?.isPublic)

      return {
        isPublic: data?.isPublic,
      }
    },
    mode: "onTouched",
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const updateCollectionPrivacy = useUpdateCollectionPrivacy()

  const onSubmit = async (data: CollectionData) => {
    setLoading(true)
    const newCollection = {
      isPublic: isSwitchOn,
      collectionId: collectionId,
    }

    try {
      const response = await updateCollectionPrivacy.mutateAsync(newCollection)
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

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className=" flex items-center justify-center cursor-pointer">
          <Share className=" w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle>Share Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* privacy */}
          <div className="grid w-full items-center gap-1.5 mb-6">
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
          </div>

          {/* Link preview */}
          {isSwitchOn && (
            <div className="flex items-center overflow-hidden justify-between rounded-md border h-10 mb-6">
              <div
                className="relative w-full flex items-center justify-between p-2 "
                style={{ maxWidth: "350px" }}>
                <span className="text-sm break-words overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {`https://bookmarqly.com/${session?.user?.username}/c/${collectionId}`}
                </span>
              </div>
              <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center cursor-pointer">
                <Copy className="min-w-4 h-4 text-white dark:text-black" />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className=" grid grid-cols-2 gap-2">
            <DialogClose
              className={`${buttonVariants({
                variant: "outline",
              })} flex items-center gap-2 justify-center`}>
              Cancel
            </DialogClose>
            <Button type="submit">{loading ? "Updating..." : "Confirm"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CollectionShare
