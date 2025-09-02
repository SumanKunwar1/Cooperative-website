import { Request, Response } from "express"
import Notice, { INotice } from "../models/Notice"
import { uploadToCloudinary } from "../utils/cloudinary"

// Get all notices (with optional filtering)
export const getNotices = async (req: Request, res: Response) => {
  try {
    const { type, status, important, search } = req.query

    let filter: any = {}

    // Filter by type
    if (type && type !== "all") {
      filter.type = type
    }

    // Filter by status
    if (status && status !== "all") {
      filter.status = status
    }

    // Filter by important
    if (important && important !== "all") {
      filter.important = important === "true"
    }

    // Search in title or content
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    const notices = await Notice.find(filter).sort({ createdAt: -1 })
    res.status(200).json(notices)
  } catch (error: any) {
    console.error("Error fetching notices:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get a single notice by ID
export const getNoticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const notice = await Notice.findById(id)

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" })
    }

    res.status(200).json(notice)
  } catch (error: any) {
    console.error("Error fetching notice:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create a new notice
export const createNotice = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      type,
      important,
      status,
      author,
    }: Partial<INotice> = req.body

    // Validate required fields
    if (!title || !content || !type || !author) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    let documentUrl = req.body.documentUrl
    let documentType = req.body.documentType

    // Handle file upload if file exists in request
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file)
        documentUrl = uploadResult.secure_url
        // Extract file extension for documentType
        const format = uploadResult.format
        documentType = format === "jpg" ? "jpg" : format
      } catch (uploadError: any) {
        console.error("File upload error:", uploadError)
        return res.status(500).json({ message: "File upload failed", error: uploadError.message })
      }
    }

    // Set date if notice is published
    const date = status === "published" ? new Date().toISOString().split("T")[0] : ""

    const newNotice = new Notice({
      title,
      content,
      type,
      important: important || false,
      status: status || "draft",
      author,
      date,
      documentUrl,
      documentType,
    })

    const savedNotice = await newNotice.save()
    res.status(201).json(savedNotice)
  } catch (error: any) {
    console.error("Error creating notice:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update a notice
export const updateNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      title,
      content,
      type,
      important,
      status,
      author,
    }: Partial<INotice> = req.body

    const notice = await Notice.findById(id)
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" })
    }

    let documentUrl = notice.documentUrl
    let documentType = notice.documentType

    // Handle file upload if new file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file)
        documentUrl = uploadResult.secure_url
        // Extract file extension for documentType
        const format = uploadResult.format
        documentType = format === "jpg" ? "jpg" : format
      } catch (uploadError: any) {
        console.error("File upload error:", uploadError)
        return res.status(500).json({ message: "File upload failed", error: uploadError.message })
      }
    }

    // Update date if status changed to published
    let date = notice.date
    if (status === "published" && notice.status !== "published") {
      date = new Date().toISOString().split("T")[0]
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      {
        title: title || notice.title,
        content: content || notice.content,
        type: type || notice.type,
        important: important !== undefined ? important : notice.important,
        status: status || notice.status,
        author: author || notice.author,
        date,
        documentUrl,
        documentType,
      },
      { new: true, runValidators: true },
    )

    res.status(200).json(updatedNotice)
  } catch (error: any) {
    console.error("Error updating notice:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete a notice
export const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notice = await Notice.findById(id)
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" })
    }

    // TODO: Add logic to delete associated file from Cloudinary if needed

    await Notice.findByIdAndDelete(id)
    res.status(200).json({ message: "Notice deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting notice:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get public notices (only published ones)
export const getPublicNotices = async (req: Request, res: Response) => {
  try {
    const { type, search } = req.query

    let filter: any = { status: "published" }

    // Filter by type
    if (type && type !== "all") {
      filter.type = type
    }

    // Search in title or content
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    const notices = await Notice.find(filter).sort({ date: -1, createdAt: -1 })
    res.status(200).json(notices)
  } catch (error: any) {
    console.error("Error fetching public notices:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}