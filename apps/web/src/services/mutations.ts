import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  archiveBookmark,
  createBookmark,
  createCollection,
  deleteBookmark,
  deleteCollection,
  favoriteBookmark,
  updateBookmark,
  updateCollection,
  updateCollectionPrivacy,
} from "./api"
// import { toast } from "sonner"

export function useCreateCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createCollection(data),
    onMutate: () => {},
    onError: (error) => {},
    onSuccess: (data) => {
      return data
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["myCollection"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["userDetails"],
        })
      }
    },
  })
}

export function useUpdateCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateCollection(data),
    onMutate: () => {},
    onError: (error) => {},
    onSuccess: (data) => {
      return data
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["singleCollection"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["myCollection"],
        })
      }
    },
  })
}

export function useUpdateCollectionPrivacy() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateCollectionPrivacy(data),
    onMutate: () => {},
    onError: (error) => {},
    onSuccess: (data) => {
      return data
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["singleCollection"],
        })
      }
    },
  })
}

export function useDeleteCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (collectionId) => deleteCollection(collectionId),
    onMutate: () => {},
    onError: (error) => {},
    onSuccess: (data) => {
      return data
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["myCollection"],
        })
      }
    },
  })
}

export function useCreateBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createBookmark(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["singleCollection"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["myBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["favoriteBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["archiveBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["videoBookmark"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["articleBookmark"],
        })
      }
    },
  })
}

export function useUpdateBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateBookmark(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["singleCollection"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["myBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["favoriteBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["archiveBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["videoBookmark"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["articleBookmark"],
        })
      }
    },
  })
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookmarkId) => deleteBookmark(bookmarkId),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["singleCollection"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["myBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["favoriteBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["archiveBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["videoBookmark"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["articleBookmark"],
        })
      }
    },
  })
}

export function useFavoriteBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => favoriteBookmark(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["myBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["favoriteBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["archiveBookmarks"],
        })
      }
    },
  })
}

export function useArchiveBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => archiveBookmark(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["myBookmarks"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["archiveBookmarks"],
        })
      }
    },
  })
}
