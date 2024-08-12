import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  checkUsername,
  getCurrentUser,
  getFavoriteBookmarks,
  getMyBookmarks,
  getMyCollections,
  getSingleCollection,
  getUser,
  register,
  userDetails,
} from "./api"

// hono
export function useCheckUsername(data: any) {
  return useQuery({
    queryKey: ["checkUsername"],
    queryFn: () => checkUsername(data),
  })
}

// hono

export function useCurrentUser(data: any) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(data),
    placeholderData: keepPreviousData,
  })
}

export function useRegister(data: any) {
  return useQuery({
    queryKey: ["userRegister"],
    queryFn: () => register(data),
    // placeholderData: keepPreviousData,
  })
}

export function useUser(data: any) {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(data),
    retry: false,
  })
}

export function useUserDetails() {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: () => userDetails(),
    retry: false,
  })
}

export function useMyCollection() {
  return useQuery({
    queryKey: ["myCollection"],
    queryFn: () => getMyCollections(),
  })
}

export function useMyBookmarks() {
  return useQuery({
    queryKey: ["myBookmarks"],
    queryFn: () => getMyBookmarks(),
  })
}

export function useFavoriteBookmarks() {
  return useQuery({
    queryKey: ["favoriteBookmarks"],
    queryFn: () => getFavoriteBookmarks(),
  })
}

export function useSingleCollection(collectionId: any) {
  return useQuery({
    queryKey: ["singleCollection"],
    queryFn: () => getSingleCollection(collectionId),
  })
}
