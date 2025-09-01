import type { Request, Response } from "express"
import { uploadToCloudinary } from "../utils/cloudinary"
import { v2 as cloudinary } from "cloudinary"

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const result = await uploadToCloudinary(req.file)

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.body

    if (!publicId) {
      return res.status(400).json({ message: "Public ID is required" })
    }

    await cloudinary.uploader.destroy(publicId)

    res.json({
      success: true,
      message: "Image deleted successfully",
    })
  } catch (error: any) {
    console.error("Delete error:", error)
    res.status(500).json({ message: error.message })
  }
}
