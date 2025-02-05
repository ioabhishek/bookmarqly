"use client"
import { toast } from "sonner"
import { FC, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import { useDeleteCollection } from "@/services/mutations"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface DeleteCollectionPopupProps {
  collectionId: string
}

const DeleteCollectionPopup: FC<DeleteCollectionPopupProps> = ({
  collectionId,
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const deleteCollectionMutation = useDeleteCollection()
  const router = useRouter()

  const { data: session } = useSession()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteCollectionMutation.mutateAsync(collectionId)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        // toast.success("Collection deleted successfully!")
        router.push(`/collections`)
      }
    } catch (error) {
      setLoading(false)
      setOpen(false)
      // toast.error("something went wrong. Please try again🙏")
    }
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Trash2 className=" w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Delete collection</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              collection and remove your collection data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete}>
              {loading ? (
                <>
                  Deleting <Loader2 className="animate-spin w-4 h-4 ml-2" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteCollectionPopup
