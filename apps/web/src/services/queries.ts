import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  getArchiveBookmarks,
  getFavoriteBookmarks,
  getMyBookmarks,
  getMyCollections,
  getSingleCollection,
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

export function useSingleCollection(collectionId: any) {
  return useQuery({
    queryKey: ["singleCollection"],
    queryFn: () => getSingleCollection(collectionId),
  })
}
