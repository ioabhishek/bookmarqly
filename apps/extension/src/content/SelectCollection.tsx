import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FC } from "react"

interface TestingProps {
  collections: any
  id: string
  setId: Function
}

const SelectCollection: FC<TestingProps> = ({ collections, id, setId }) => {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between w-full">
          {name
            ? collections.find((collection: any) => collection.name === name)
                ?.name
            : "Select collection"}
          <ChevronsUpDown className=" ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" min-w-[260px] w-[260px] p-0">
        <Command>
          <CommandInput
            placeholder="Search collection"
            className=" outline-none bg-transparent text-white border-none inputCss"
          />
          <CommandList>
            <CommandEmpty>
              Fetching collection or No collection found!
            </CommandEmpty>
            <CommandGroup>
              {collections.map((collection: any) => (
                <CommandItem
                  className=" text-white"
                  key={collection.name}
                  value={collection.name}
                  onSelect={(currentValue) => {
                    setId(currentValue === name ? "" : collection.id)
                    setName(currentValue === name ? "" : currentValue)
                    setOpen(false)
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      id === collection.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {collection.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectCollection
