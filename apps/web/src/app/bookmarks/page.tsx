"use client"
import BookmarkCard from "@/components/bookmark/BookmarkCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { useMyBookmarks } from "@/services/queries"
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
  LayoutGrid,
  LayoutList,
  ListFilter,
  Plus,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Separator } from "@repo/ui/components/separator"
import { useInfiniteQuery } from "@tanstack/react-query"
import axiosPublic from "@/hooks/useAxios"
import { BASE_URL, BOOKMARK, PAGE_LIMIT } from "@/utils/Endpoints"
import BookmarkList from "@/components/bookmark/BookmarkList"

const page = () => {
  const [layoutType, setLayoutType] = useState("grid")
  const [sortBy, setSortBy] = useState("desc")
  const bottomBoundaryRef = useRef(null)

  // const myBookmarksQuery = useMyBookmarks(sortBy)
  // const myBookmarks = myBookmarksQuery?.data?.data?.data

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["myBookmarks"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosPublic.get(
        `${BOOKMARK}?sortby=${sortBy}&page=${pageParam}&limit=${PAGE_LIMIT}`
      )
      return response?.data?.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === 0) return
      return allPages?.length + 1
    },
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.3,
      }
    )

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current)
    }

    return () => {
      if (bottomBoundaryRef.current) {
        observer.unobserve(bottomBoundaryRef.current)
      }
    }
  }, [bottomBoundaryRef, fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleSort = async (sort: string) => {
    await setSortBy(sort)
    refetch()
  }

  return (
    <div className="w-full h-[calc(100%-48px)] md:h-[calc(100%-64px)] flex flex-col">
      <div className="py-4 px-3 md:py-6 md:px-8">
        {/* Title and filter */}
        <div className=" flex justify-between items-center mb-3 md:mb-5">
          <h2 className=" text-2xl font-semibold">Bookmarks</h2>

          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center outline-none">
                {sortBy === "desc" ? (
                  <ArrowUpWideNarrow className="w-6 h-6" />
                ) : (
                  <ArrowDownNarrowWide className="w-6 h-6" />
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={() => handleSort("asc")}>
                  <ArrowDownNarrowWide className="w-5 h-5" />
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={() => handleSort("desc")}>
                  <ArrowUpWideNarrow className="w-5 h-5" />
                  Newest first
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="mt-3 md:mt-4 mb-3 md:mb-8" />

        {/* Bookmark list */}
        <div
          className={`${layoutType} grid-cols-1 md:grid-cols-4 flex-col gap-3 md:gap-5 pt-0`}>
          {data &&
            data?.pages?.map((page, index) => (
              <BookmarkList bookmarks={page} key={index} />
            ))}
          <div ref={bottomBoundaryRef}></div>
        </div>
      </div>
    </div>
  )
}

export default page
