import { Hono } from "hono"
import { jwtVerify, verifyUser } from "../middleware/auth.middleware"
import {
  createBookmark,
  deleteBookmark,
  getBookmarks,
  singleBookmark,
  updateBookmark,
} from "../controllers/bookmark.controller"
import { validator } from "hono/validator"
import {
  createBookmarkSchema,
  updateBookmarkSchema,
} from "../utils/validations"

const bookmark = new Hono<{ Bindings: CloudflareEnv }>()

bookmark.get("/", jwtVerify, getBookmarks)
bookmark.post(
  "/",
  jwtVerify,
  validator("json", (value, c) => {
    const parsed = createBookmarkSchema.safeParse(value)
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
  createBookmark
)
bookmark.put(
  "/",
  jwtVerify,
  validator("json", (value, c) => {
    const parsed = updateBookmarkSchema.safeParse(value)
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
  updateBookmark
)
bookmark.get("/:id", jwtVerify, singleBookmark)
bookmark.delete("/:id", jwtVerify, deleteBookmark)

export default bookmark
