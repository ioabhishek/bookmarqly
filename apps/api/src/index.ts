import { Hono } from "hono"
import auth from "./routes/auth.route"
import { cors } from "hono/cors"
import collection from "./routes/collection.route"
import bookmark from "./routes/bookmark.route"

const app = new Hono()

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000", "https://bookmarqly.vercel.app"],
    allowMethods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
)

app.get("/", async (c) => {
  return c.text("👋 Hello 👋")
})

app.route("/auth", auth)
app.route("/collection", collection)
app.route("/bookmark", bookmark)

export default app
