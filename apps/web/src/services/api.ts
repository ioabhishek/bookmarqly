import axiosPublic from "@/hooks/useAxios"
import {
  BOOKMARK,
  COLLECTION,
  COLLECTION_PRIVACY,
  CREATE_BOOKMARK,
  CREATE_COLLECTION,
  CURRENT_USER,
  DELETE_BOOKMARK,
  DELETE_COLLECTION,
  FORGOT_PASSWORD,
  GET_USER,
  LOGIN,
  LOGOUT,
  MY_BOOKMARKS,
  MY_COLLECTION,
  REFRESH_TOKEN,
  REGISTER,
  SINGLE_COLLECTION,
  UPDATE_BOOKMARK,
  UPDATE_COLLECTION,
  USER,
  USER_DETAILS,
  USERNAME,
} from "@/utils/Endpoints"

// Hono apis
export const checkUsername = async (data: any) => {
  return await axiosPublic.get(`${USERNAME}?u=${data}`)
}

// Hono apis

export const register = async (data: any) => {
  return await axiosPublic.post(REGISTER, data)
}

export const login = async (data: any) => {
  return await axiosPublic.post(LOGIN, data)
}

export const logout = async () => {
  return await axiosPublic.post(LOGOUT)
}

export const forgotPassword = async (data: any) => {
  return await axiosPublic.post(FORGOT_PASSWORD, data)
}

export const getCurrentUser = async (data: any) => {
  return await axiosPublic.post(CURRENT_USER, data)
}

export const getUser = async (data: any) => {
  return await axiosPublic.get(`${USERNAME}/${data}`)
}

export const userDetails = async () => {
  return await axiosPublic.get(`${USER_DETAILS}`)
}

export const getMyCollections = async () => {
  return await axiosPublic.get(`${COLLECTION}`)
}

export const getMyBookmarks = async () => {
  return await axiosPublic.get(`${BOOKMARK}`)
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
