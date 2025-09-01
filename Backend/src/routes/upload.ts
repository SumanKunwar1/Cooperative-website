import express from "express"
import { upload } from "../middleware/upload"
import { uploadImage, deleteImage } from "../controllers/upload.controller"

const router = express.Router()

router.post("/image", upload.single("image"), uploadImage)
router.delete("/image", deleteImage)

export default router
