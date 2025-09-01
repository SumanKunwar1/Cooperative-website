import express from "express"
import {
  getBusinesses,
  getBusinessBySlug,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getUserBusiness,
  getCurrentUserBusiness,
  updateBusinessImages,
} from "../controllers/businessDetail.controller"

const router = express.Router()

// Public routes - no authentication required
router.get("/", getCurrentUserBusiness)
router.get("/directory", getBusinesses)
router.get("/user/:userId", getUserBusiness)
router.get("/:businessName", getBusinessBySlug)
router.post("/", createBusiness)
router.put("/:id", updateBusiness)
router.delete("/:id", deleteBusiness)
router.put("/:id/images", updateBusinessImages)

export default router
