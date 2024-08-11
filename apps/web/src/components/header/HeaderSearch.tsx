"use client"
import { Input } from "@repo/ui/components/input"
import { Search } from "lucide-react"
import { FC } from "react"

interface HeaderSearchProps {}

const HeaderSearch: FC<HeaderSearchProps> = ({}) => {
  return (
    <div className="cursor-pointer md:h-auto relative flex items-center justify-center rounded-md gap-2 min-w-[30%] max-w-[25%]">
      <Search className=" md:absolute md:left-3 md:top-1/2 md:transform md:-translate-y-1/2 h-4 w-4 text-secondary-foreground md:stroke-muted-foreground" />
      <Input
        placeholder="Search for collection or links..."
        className="pl-9 cursor-pointer hidden md:block bg-border rounded-full "
        type="search"
      />
    </div>
  )
}

export default HeaderSearch
