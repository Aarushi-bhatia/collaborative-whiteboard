import cron from "node-cron"
import express from "express"
import { createServer } from "http"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import { initWebSocket } from "./wsHandler.js"
import morgan from "morgan"
import { fileURLToPath } from "url";
import path from "path"
import { rateLimit } from "express-rate-limit"
import axios from "axios"

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {createStream} from "rotating-file-stream"
const app = express()

app.set("trust proxy", 1)

//logs
const logDir = path.join(__dirname, "logs")

const logStream = createStream("requestLogs.log", {
  interval: "1d",
  path: logDir
})

//cors


app.use(cors())

app.use(limiter)
app.use(morgan("common", { stream: logStream }))
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello there" })
})

app.use("/user", userRoutes)
app.use("/room", roomRoutes)

const PORT = parseInt(process.env.PORT ?? "5000", 10)
const server = createServer(app)

// Initialize the WebSocket logic on the shared HTTP server
initWebSocket(server)

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

cron.schedule("*/14 * * * *", async () => {
  try {
    const res = await axios.get(`http://localhost:10000`)
    console.log(res.data)
  } catch (e) {
    console.error(e)
  }
})