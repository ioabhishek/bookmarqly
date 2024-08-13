"use client"
import { FC } from "react"
import BookmarkCard from "./BookmarkCard"

interface BookmarkListProps {
  bookmarks: any
}

const BookmarkList: FC<BookmarkListProps> = ({ bookmarks }) => {
  return (
    <>
      {bookmarks?.map((bookmark, index) => (
        <BookmarkCard key={index} data={bookmark} />
      ))}
    </>
  )
}

export default BookmarkList
