import { z } from "zod"

export const createCollectionSchema = z.object({
  name: z.string().min(2, {
    message:
      "Name should not be empty or should have a minimum of 3 characters",
  }),
  description: z.string().min(2, {
    message:
      "Description should not be empty or should have a minimum of 3 characters",
  }),
})

export const updateCollectionSchema = z.object({
  name: z.string().min(2, {
    message:
      "Name should not be empty or should have a minimum of 3 characters",
  }),
  description: z.string().min(2, {
    message:
      "Description should not be empty or should have a minimum of 3 characters",
  }),
  collectionId: z
    .string()
    .min(1, { message: "Collection ID is either empty or it's not valid." }),
})

export const updateCollectionPricacySchema = z.object({
  isPublic: z.boolean(),
  collectionId: z
    .string()
    .min(1, { message: "Collection ID is either empty or it's not valid." }),
})

export const createBookmarkSchema = z.object({
  url: z
    .string()
    .url({ message: "Invalid URL format" })
    .min(1, { message: "URL is required" }),
  note: z.string().optional(),
  collectionId: z.string().optional(),
})

export const updateBookmarkSchema = z.object({
  collectionId: z
    .string()
    .min(1, { message: "Collection ID is either empty or it's not valid." }),
  bookmarkId: z
    .string()
    .min(1, { message: "Bookmark ID is either empty or it's not valid." }),
})
