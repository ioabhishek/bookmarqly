"use client"
import { FC, useState } from "react"
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover"
import { useMyCollection } from "@/services/queries"

interface CreateBookmarkProps {
  id: string
  setId: Function
}

const CollectionList: FC<CreateBookmarkProps> = ({ id, setId }) => {
  const [open, setOpen] = useState(false)

  const collectionsQuery = useMyCollection()
  const collections = collectionsQuery?.data?.data?.data

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {id
            ? collections?.find((collection) => collection.id === id)?.name
            : "Select collection..."}
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className=" w-full">
          <CommandInput placeholder="Search collection..." className="h-9" />
          <CommandEmpty>No collection found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {collections?.map((collection) => (
                <CommandItem
                  key={collection.id}
                  value={collection.id}
                  onSelect={(currentValue) => {
                    setId(currentValue === id ? "" : currentValue)
                    setOpen(false)
                  }}>
                  {collection.name}
                  {/* <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      title === collection.id ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CollectionList
