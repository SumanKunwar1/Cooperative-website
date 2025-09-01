import type { Request, Response } from "express"
import Business from "../models/BusinessDetail"
import mongoose from "mongoose"

const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const { search, category, status } = req.query

    const filter: any = { status: "active" }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { services: { $in: [new RegExp(search as string, "i")] } },
      ]
    }

    if (category && category !== "All Categories") {
      filter.category = category
    }

    const businesses = await Business.find(filter).sort({ createdAt: -1 })

    res.json({
      success: true,
      data: businesses,
    })
  } catch (error: any) {
    console.error("Get businesses error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const getBusinessBySlug = async (req: Request, res: Response) => {
  try {
    const { businessName } = req.params

    const business = await Business.findOne({ slug: businessName, status: "active" })

    if (!business) {
      return res.status(404).json({ message: "Business not found" })
    }

    res.json({
      success: true,
      data: business,
    })
  } catch (error: any) {
    console.error("Get business by slug error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { owner, ...businessData } = req.body

    if (!owner) {
      return res.status(400).json({ message: "Owner ID is required" })
    }

    const businessWithSameName = await Business.findOne({
      name: businessData.name,
      status: "active",
    })

    if (businessWithSameName) {
      return res.status(400).json({
        message: "Business name already exists. Please choose a different name.",
      })
    }

    const finalBusinessData = {
      ...businessData,
      owner: new mongoose.Types.ObjectId(owner),
      slug: createSlug(businessData.name),
      status: "active", // Auto-approve for simplicity
    }

    const business = new Business(finalBusinessData)
    await business.save()

    res.status(201).json({
      success: true,
      data: business,
    })
  } catch (error: any) {
    console.error("Create business error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { owner, ...updateData } = req.body

    const business = await Business.findById(id)

    if (!business) {
      return res.status(404).json({ message: "Business not found" })
    }

    if (updateData.name && updateData.name !== business.name) {
      const businessWithSameName = await Business.findOne({
        name: updateData.name,
        _id: { $ne: id },
        status: "active",
      })

      if (businessWithSameName) {
        return res.status(400).json({
          message: "Business name already exists. Please choose a different name.",
        })
      }

      // Update slug if name changed
      updateData.slug = createSlug(updateData.name)
    }

    const updatedBusiness = await Business.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    res.json({
      success: true,
      data: updatedBusiness,
    })
  } catch (error: any) {
    console.error("Update business error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const business = await Business.findById(id)

    if (!business) {
      return res.status(404).json({ message: "Business not found" })
    }

    await Business.findByIdAndDelete(id)

    res.json({
      success: true,
      message: "Business deleted successfully",
    })
  } catch (error: any) {
    console.error("Delete business error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const getUserBusiness = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const targetUserId = userId || "507f1f77bcf86cd799439011"

    const business = await Business.findOne({ owner: new mongoose.Types.ObjectId(targetUserId) })

    if (!business) {
      return res.status(404).json({ message: "No business found for this user" })
    }

    res.json({
      success: true,
      data: business,
    })
  } catch (error: any) {
    console.error("Get user business error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const getCurrentUserBusiness = async (req: Request, res: Response) => {
  try {
    // Using hardcoded userId for simplified college project
    const userId = "507f1f77bcf86cd799439011"

    const business = await Business.findOne({ owner: new mongoose.Types.ObjectId(userId) })

    if (!business) {
      return res.status(404).json({ message: "No business found for this user" })
    }

    res.json({
      success: true,
      data: business,
    })
  } catch (error: any) {
    console.error("Get current user business error:", error)
    res.status(500).json({ message: error.message })
  }
}

export const updateBusinessImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { image, gallery } = req.body

    const business = await Business.findById(id)

    if (!business) {
      return res.status(404).json({ message: "Business not found" })
    }

    const updateData: any = {}
    if (image !== undefined) updateData.image = image
    if (gallery !== undefined) updateData.gallery = gallery

    const updatedBusiness = await Business.findByIdAndUpdate(id, updateData, { new: true })

    res.json({
      success: true,
      data: updatedBusiness,
    })
  } catch (error: any) {
    console.error("Update business images error:", error)
    res.status(500).json({ message: error.message })
  }
}
