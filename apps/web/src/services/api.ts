import axiosPublic from "@/hooks/useAxios"
import { BOOKMARK, COLLECTION } from "@/utils/Endpoints"

export const getMyCollections = async (data: any) => {
  return await axiosPublic.get(`${COLLECTION}?sortby=${data}`)
}

export const getMyBookmarks = async (data: any) => {
  return await axiosPublic.get(`${BOOKMARK}?sortby=${data}`)
}

export const getFavoriteBookmarks = async (data: any) => {
  return await axiosPublic.get(`${BOOKMARK}?favorites=true?&sortby=${data}`)
}

export const getArchiveBookmarks = async (data: any) => {
  return await axiosPublic.get(`${BOOKMARK}?archive=true?&sortby=${data}`)
}

export const createCollection = async (data: any) => {
  return await axiosPublic.post(`${COLLECTION}`, data)
}

export const updateCollection = async (data: any) => {
  return await axiosPublic.put(`${COLLECTION}`, data)
}

export const updateCollectionPrivacy = async (data: any) => {
  return await axiosPublic.patch(`${COLLECTION}`, data)
}

export const deleteCollection = async (collectionId: any) => {
  return await axiosPublic.delete(`${COLLECTION}?collectionId=${collectionId}`)
}

export const getSingleCollection = async (collectionId: any) => {
  return await axiosPublic.get(`${COLLECTION}/${collectionId}`)
}

export const createBookmark = async (data: any) => {
  return await axiosPublic.post(`${BOOKMARK}`, data)
}

export const updateBookmark = async (data: any) => {
  return await axiosPublic.put(`${BOOKMARK}`, data)
}

export const deleteBookmark = async (bookmarkId: string) => {
  return await axiosPublic.delete(`${BOOKMARK}?bookmarkId=${bookmarkId}`)
}

export const favoriteBookmark = async (data: any) => {
  return await axiosPublic.post(`${BOOKMARK}/${data?.bookmarkId}`, data)
}
