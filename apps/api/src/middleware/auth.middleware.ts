import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt"

export const jwtVerify = createMiddleware(async (c, next) => {
  const accessToken =
    c.req.header("Authorization") || getCookie(c, "accessToken")
  const token = accessToken?.replace("Bearer ", "")

  try {
    const decodedPayload = await verify(token, c.env.AUTH_SECRET)
    c.set("decodedPayload", decodedPayload)
    await next()
  } catch (error) {
    return c.json({ message: "Invalid token", error }, 401)
  }
})

export const verifyUser = createMiddleware(async (c, next) => {
  const accessToken =
    c.req.header("Authorization") || getCookie(c, "accessToken")

  if (accessToken) {
    const token = accessToken?.replace("Bearer ", "")
    const decodedPayload = await verify(token, c.env.AUTH_SECRET)
    c.set("decodedPayload", decodedPayload)
  }

  await next()
})
