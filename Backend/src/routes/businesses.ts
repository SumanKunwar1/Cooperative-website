import express from "express"
import {
  getBusinesses,
  getBusiness,
  getBusinessBySlug,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getCategories,
} from "../controllers/business.controller"
import { protect, authorize } from "../middleware/auth"
import {upload} from "../middleware/upload"

const router = express.Router()

// Public routes
router.get("/directory", getBusinesses) // Public business directory
router.get("/categories", getCategories)
router.get("/:id", getBusiness)
router.get("/slug/:slug", getBusinessBySlug)

// Protected routes (simple authentication)
router.use(protect)
router.use(authorize)

// Admin routes
router.route("/").get(getBusinesses).post(upload.single("image"), createBusiness)

router.route("/:id").put(upload.single("image"), updateBusiness).delete(deleteBusiness)

export default router
