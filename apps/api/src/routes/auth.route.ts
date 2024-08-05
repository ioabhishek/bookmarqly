import { Hono } from "hono"
import { jwtVerify, verifyUser } from "../middleware/auth.middleware"
import {
  checkUsername,
  createUpdateUser,
  createUsername,
  userDetails,
  usernameDetails,
} from "../controllers/auth.controller"

const auth = new Hono<{ Bindings: CloudflareEnv }>()

auth.get("/:username", verifyUser, usernameDetails)
auth.get("/user", jwtVerify, userDetails)
auth.post("/user", createUpdateUser)
auth.get("/username", checkUsername)
auth.post("/username", jwtVerify, createUsername)

export default auth
