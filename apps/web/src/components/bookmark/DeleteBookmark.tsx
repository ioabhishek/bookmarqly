"use client"
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
import { useDeleteBookmark } from "@/services/mutations"
// import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import { Button } from "@repo/ui/components/button"

interface DeleteBookmarkProps {
  bookmarkId: string
}

const DeleteBookmark: FC<DeleteBookmarkProps> = ({ bookmarkId }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const deleteBookmarkMutation = useDeleteBookmark()

  const handleDelete = async () => {
    setLoading(true)

    try {
      const response = await deleteBookmarkMutation.mutateAsync(bookmarkId)
      if (response?.data?.success) {
        setLoading(false)
        setOpen(false)
        // toast.success("Bookmark deleted successfully!")
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
                <Trash2 className=" w-4 h-4 text-muted-foreground mt-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              bookmark and remove your collection data from our servers.
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

export default DeleteBookmark
