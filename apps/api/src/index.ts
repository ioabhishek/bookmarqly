import { Hono } from "hono"
import auth from "./routes/auth.route"
import { cors } from "hono/cors"
import collection from "./routes/collection.route"

const app = new Hono()

app.use(
  "/*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
)

app.route("/collection", collection)
app.route("/auth", auth)

export default app
