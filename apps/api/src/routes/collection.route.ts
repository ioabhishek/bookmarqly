import { Hono } from "hono"
import { jwtVerify, verifyUser } from "../middleware/auth.middleware"
import {
  createCollection,
  deleteCollection,
  getCollection,
  singleCollection,
  updateCollection,
  updatePrivacy,
} from "../controllers/collection.controller"
import { validator } from "hono/validator"
import {
  createCollectionSchema,
  updateCollectionPricacySchema,
  updateCollectionSchema,
} from "../utils/validations"

const collection = new Hono<{ Bindings: CloudflareEnv }>()

collection.get("/", verifyUser, getCollection)
collection.post(
  "/",
  jwtVerify,
  validator("json", (value, c) => {
    const parsed = createCollectionSchema.safeParse(value)
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }))

      return c.json(
        { success: false, message: "Validation error", errors: errors },
        400
      )
    }
    return parsed.data
  }),
  createCollection
)
collection.put(
  "/",
  jwtVerify,
  validator("json", (value, c) => {
    const parsed = updateCollectionSchema.safeParse(value)
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }))

      return c.json(
        { success: false, message: "Validation error", errors: errors },
        400
      )
    }
    return parsed.data
  }),
  updateCollection
)
collection.patch(
  "/",
  jwtVerify,
  validator("json", (value, c) => {
    const parsed = updateCollectionPricacySchema.safeParse(value)
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }))

      return c.json(
        { success: false, message: "Validation error", errors: errors },
        400
      )
    }
    return parsed.data
  }),
  updatePrivacy
)
collection.get("/:id", verifyUser, singleCollection)
collection.delete("/:id", jwtVerify, deleteCollection)

export default collection
