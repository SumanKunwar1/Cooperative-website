import express from "express"
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  getPublicNotices,
} from "../controllers/notice.controller"
import { upload } from "../middleware/upload"
// Remove the protect import

const router = express.Router()

// Public routes
router.get("/public", getPublicNotices)

// Remove authentication from these routes
router.get("/", getNotices)
router.get("/:id", getNoticeById)
router.post("/", upload.single("document"), createNotice)
router.put("/:id", upload.single("document"), updateNotice)
router.delete("/:id", deleteNotice)

export default router