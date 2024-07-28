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
import { Trash2 } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import { useDeleteCollection } from "@/services/mutations"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/services/queries"

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

  const currentUserQuery = useCurrentUser({})
  const currentUser = currentUserQuery?.data?.data?.data

  const deleteCollectionData = {
    id: collectionId,
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response =
        await deleteCollectionMutation.mutateAsync(deleteCollectionData)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        // toast.success("Collection deleted successfully!")
        router.push(`/${currentUser?.username}`)
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
          <div className=" flex items-center justify-center w-8 h-8 rounded-sm border border-white/30 cursor-pointer">
            <Trash2 className=" w-4 h-4" />
          </div>
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
              {loading ? "Deleting..." : "Delete"}
            </Button>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteCollectionPopup
