import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  articleBookmark,
  getArchiveBookmarks,
  getFavoriteBookmarks,
  getMyBookmarks,
  getMyCollections,
  getSingleCollection,
  videoBookmark,
} from "./api"

export function useMyCollection(data: any) {
  return useQuery({
    queryKey: ["myCollection"],
    queryFn: () => getMyCollections(data),
  })
}

export function useMyBookmarks(data: any) {
  return useQuery({
    queryKey: ["myBookmarks"],
    queryFn: () => getMyBookmarks(data),
  })
}

export function useFavoriteBookmarks(data: any) {
  return useQuery({
    queryKey: ["favoriteBookmarks"],
    queryFn: () => getFavoriteBookmarks(data),
  })
}

export function useArchiveBookmarks(data: any) {
  return useQuery({
    queryKey: ["archiveBookmarks"],
    queryFn: () => getArchiveBookmarks(data),
  })
}

export function useSingleCollection(payload: any) {
  return useQuery({
    queryKey: ["singleCollection"],
    queryFn: () => getSingleCollection(payload),
  })
}

export function useArticleBookmark(data: any) {
  return useQuery({
    queryKey: ["articleBookmark"],
    queryFn: () => articleBookmark(data),
  })
}

export function useVideoBookmark(data: any) {
  return useQuery({
    queryKey: ["videoBookmark"],
    queryFn: () => videoBookmark(data),
  })
}
