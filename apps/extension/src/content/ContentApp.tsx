import axios from "axios"
import { FC, useEffect } from "react"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import SelectCollection from "./SelectCollection"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

const BACKEND_URL = "https://bookmarqly.vercel.app/api/"

interface ContentAppProps {
  token: string
}

const ContentApp: FC<ContentAppProps> = ({ token }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [collections, setCollections] = useState([])
  const [id, setId] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [activeUrl, setActiveUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getCollections = async () => {
    const response = await axios.get(`${BACKEND_URL}collection`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
    setCollections(response?.data?.data)
  }

  const getCurrentUrl = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "getActiveUrl" }, (response) => {
        if (response && response.url) {
          resolve(response.url)
        } else {
          reject(new Error("url not found"))
        }
      })
    })
  }

  useEffect(() => {
    if (isPopoverOpen) {
      getCurrentUrl()
        .then((url) => setActiveUrl(url))
        .catch((error) => console.error(error))
    }
  }, [isPopoverOpen])

  const payload = {
    url: activeUrl,
    collectionId: id,
    note: inputValue,
  }

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}bookmark`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      if (response?.data?.success === true) {
        setIsLoading(false)
        setIsPopoverOpen(false)
        toast({
          title: "Added to Bookmarqly 🎉",
        })
      } else {
        setIsLoading(false)
        toast({
          title: response?.data?.message,
        })
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Soemthing went wrong. Please try again!",
      })
    }
  }

  return (
    <div
      className="flex justify-end items-end fixed right-0"
      style={{ bottom: "80px" }}>
      <Toaster />

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          className=" w-9 h-9 rounded-full flex items-center justify-center bg-black border border-white shadow-lg"
          onClick={getCollections}>
          <Bookmark className="w-5 h-5" fill="white" />
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-2 testing">
          <div className=" flex flex-col gap-2">
            <Label htmlFor="link">Link</Label>
            <Input
              name="link"
              placeholder="Enter url"
              value={activeUrl}
              onChange={(e) => setActiveUrl(e.target.value)}
            />
          </div>

          <div className=" flex flex-col gap-2">
            <Label htmlFor="select">Select collection</Label>
            <SelectCollection collections={collections} id={id} setId={setId} />
          </div>

          <div className=" flex flex-col gap-2">
            <Label htmlFor="email">Note</Label>
            <Textarea
              className=" text-white"
              placeholder="Enter you note here..."
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <Button className=" w-full mt-2 button-css" onClick={handleClick}>
            {isLoading ? "Adding..." : "Add to Bookmarqly"}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ContentApp
