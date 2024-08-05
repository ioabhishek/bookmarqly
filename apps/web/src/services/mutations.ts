import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createBookmark,
  createCollection,
  deleteBookmark,
  deleteCollection,
  forgotPassword,
  login,
  logout,
  register,
  updateBookmark,
  updateCollection,
  updateCollectionPrivacy,
} from "./api"
// import { toast } from "sonner"

export function useRegister() {
  return useMutation({
    mutationFn: (data) => register(data),
    onMutate: () => {},
    onError: () => {},
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      }
    },
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: (data) => login(data),
    onMutate: () => {},
    onError: () => {},
    onSettled: async (data, error) => {
      if (data?.data?.success) {
        localStorage.setItem("accessToken", data?.data?.data?.accessToken)
        localStorage.setItem("refreshToken", data?.data?.data?.refreshToken)
        localStorage.setItem("user", data?.data?.data?.user?.username)
      }
      // if (error) {
      //   toast.error(error?.response?.data?.message)
      // }
    },
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
    onMutate: () => {},
    onError: () => {},
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      }
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
    onMutate: () => {},
    onError: () => {},
    onSettled: async (_, error) => {
      // if (error) {
      //   // console.log(error)
      // }
    },
  })
}

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
        // toast.success("Collection deleted successfully!")
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
      }
    },
  })
}
