import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

// Routes
import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import businessRoutes from "./routes/businesses"
import businessDetailsRoutes from "./routes/businessDetails"
import uploadRoutes from "./routes/upload"
import accountApplicationRoutes from "./routes/accountApplication"
import loanApplicationRoutes from "./routes/loanApplication"
import noticeRoutes from "./routes/notices"
import galleryRoutes from "./routes/gallery"
import shareholderRoutes from "./routes/shareholders"
import teamRoutes from "./routes/teams"
import heroRoutes from "./routes/hero"

// Middleware
import errorHandler from "./middleware/errorHandler"

dotenv.config()

const app = express()

// ---------------- CORS CONFIG ----------------
const allowedOrigins = [
  "http://localhost:5173",                     // Dev frontend
  "http://constellationcooperative.com",
  "http://www.constellationcooperative.com",
  "https://constellationcooperative.com",      // HTTPS production
  "https://www.constellationcooperative.com"
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)
// ---------------------------------------------

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 min
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),      // limit each IP
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan("combined"))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/businesses", businessRoutes)
app.use("/api/business-details", businessDetailsRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/account-applications", accountApplicationRoutes)
app.use("/api/loan-applications", loanApplicationRoutes)
app.use("/api/notices", noticeRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/shareholders", shareholderRoutes)
app.use("/api/team", teamRoutes)
app.use("/api/hero", heroRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use(errorHandler)

export default app

