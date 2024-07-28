import axiosPublic from "@/hooks/useAxios"
import {
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
} from "@/utils/Endpoints"

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
  return await axiosPublic.get(`${GET_USER}/${data}`)
}

export const getMyCollections = async () => {
  return await axiosPublic.get(`${MY_COLLECTION}`)
}

export const getMyBookmarks = async () => {
  return await axiosPublic.get(`${MY_BOOKMARKS}`)
}

export const createCollection = async (data: any) => {
  return await axiosPublic.post(`${CREATE_COLLECTION}`, data)
}

export const updateCollection = async (data: any) => {
  return await axiosPublic.post(`${UPDATE_COLLECTION}`, data)
}

export const updateCollectionPrivacy = async (data: any) => {
  return await axiosPublic.post(`${COLLECTION_PRIVACY}`, data)
}

export const deleteCollection = async (data: any) => {
  return await axiosPublic.post(`${DELETE_COLLECTION}`, data)
}

export const getSingleCollection = async (collectionId: any) => {
  return await axiosPublic.get(`${SINGLE_COLLECTION}${collectionId}`)
}

export const createBookmark = async (data: any) => {
  return await axiosPublic.post(`${CREATE_BOOKMARK}`, data)
}

export const updateBookmark = async (data: any) => {
  return await axiosPublic.post(`${UPDATE_BOOKMARK}`, data)
}

export const deleteBookmark = async (data: any) => {
  return await axiosPublic.post(`${DELETE_BOOKMARK}`, data)
}
