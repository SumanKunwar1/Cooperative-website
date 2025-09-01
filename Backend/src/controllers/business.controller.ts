import type { Request, Response, NextFunction } from "express"
import Business, { type IBusiness } from "../models/Business"
import type { FilterQuery } from "mongoose"
import { uploadToCloudinary } from "../utils/cloudinary"

// Get all businesses with filtering, sorting and pagination
export const getBusinesses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      limit = 15,
      search,
      category,
      subcategory,
      isVerified,
      status,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query

    // Build filter object
    const filter: FilterQuery<IBusiness> = {}

    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: "i" } },
        { description: { $regex: search as string, $options: "i" } },
        { services: { $in: [new RegExp(search as string, "i")] } },
      ]
    }

    if (category && category !== "all") {
      filter.category = category
    }

    if (subcategory) {
      filter.subcategory = subcategory
    }

    if (isVerified) {
      filter.isVerified = isVerified === "true"
    }

    if (status) {
      filter.status = status
    }

    // For public directory, only show active and verified businesses
    if (req.route.path === "/directory") {
      filter.status = "active"
      filter.isVerified = true
    }

    // Build sort object
    const sortOptions: any = {}
    if (sortBy === "rating") {
      sortOptions.rating = sortOrder === "desc" ? -1 : 1
    } else if (sortBy === "reviews") {
      sortOptions.reviews = sortOrder === "desc" ? -1 : 1
    } else if (sortBy === "name") {
      sortOptions.name = sortOrder === "desc" ? -1 : 1
    } else if (sortBy === "createdAt") {
      sortOptions.createdAt = sortOrder === "desc" ? -1 : 1
    }

    const options = {
      page: Number.parseInt(page as string),
      limit: Number.parseInt(limit as string),
      sort: sortOptions,
    }

    const businesses = await Business.find(filter)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)

    const total = await Business.countDocuments(filter)

    res.status(200).json({
      success: true,
      data: businesses,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get single business by ID
export const getBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await Business.findById(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    res.status(200).json({
      success: true,
      data: business,
    })
  } catch (error) {
    next(error)
  }
}

// Get single business by slug
export const getBusinessBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create a slug from the name parameter
    const slug = req.params.slug
    const name = slug.replace(/-/g, " ")

    // Find business by name (approximate match)
    const business = await Business.findOne({
      name: { $regex: name, $options: "i" },
      status: "active",
      isVerified: true,
    })

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    res.status(200).json({
      success: true,
      data: business,
    })
  } catch (error) {
    next(error)
  }
}

// Create new business
export const createBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Parse services if it's a JSON string
    if (req.body.services && typeof req.body.services === "string") {
      try {
        req.body.services = JSON.parse(req.body.services)
      } catch (e) {
        // If parsing fails, treat as single service
        req.body.services = [req.body.services]
      }
    }

    // Convert string boolean to actual boolean
    if (req.body.isVerified === "true") {
      req.body.isVerified = true
    } else if (req.body.isVerified === "false") {
      req.body.isVerified = false
    }

    // Handle image upload
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file)
        req.body.image = uploadResult.secure_url
      } catch (error) {
        console.error("Cloudinary upload error:", error)
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        })
      }
    } else if (req.body.imageUrl) {
      // Use provided image URL
      req.body.image = req.body.imageUrl
      delete req.body.imageUrl
    }

    // Set createdBy to the authenticated user's ID
    if (req.user && req.user.id) {
      req.body.createdBy = req.user.id
    }

    const business = await Business.create(req.body)

    res.status(201).json({
      success: true,
      data: business,
    })
  } catch (error) {
    console.error("Create business error:", error)
    next(error)
  }
}

// Update business
export const updateBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let business = await Business.findById(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Parse services if it's a JSON string
    if (req.body.services && typeof req.body.services === "string") {
      try {
        req.body.services = JSON.parse(req.body.services)
      } catch (e) {
        // If parsing fails, treat as single service
        req.body.services = [req.body.services]
      }
    }

    // Convert string boolean to actual boolean
    if (req.body.isVerified === "true") {
      req.body.isVerified = true
    } else if (req.body.isVerified === "false") {
      req.body.isVerified = false
    }

    // Handle image upload
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file)
        req.body.image = uploadResult.secure_url
      } catch (error) {
        console.error("Cloudinary upload error:", error)
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        })
      }
    } else if (req.body.imageUrl) {
      // Use provided image URL
      req.body.image = req.body.imageUrl
      delete req.body.imageUrl
    }

    business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: business,
    })
  } catch (error) {
    console.error("Update business error:", error)
    next(error)
  }
}

// Delete business
export const deleteBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await Business.findById(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    await Business.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Get business categories and subcategories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = [
      "Technology",
      "Food & Beverage",
      "Hospitality",
      "Home Services",
      "Retail",
      "Healthcare",
      "Education",
      "Others",
    ]

    const subcategories: { [key: string]: string[] } = {
      Technology: ["IT Services", "Software Development", "Hardware", "Telecommunications"],
      "Food & Beverage": ["Restaurant", "Cafe", "Fast Food", "Catering", "Bar"],
      Hospitality: ["Hotel", "Resort", "Guest House", "Travel Agency"],
      "Home Services": ["Electrical", "Plumbing", "Cleaning", "Maintenance"],
      Retail: ["Wholesale", "Shopping", "Grocery", "Fashion"],
      Healthcare: ["Medical", "Dental", "Pharmacy", "Clinic"],
      Education: ["School", "Training", "Tutoring", "Institute"],
      Others: ["General", "Miscellaneous"],
    }

    res.status(200).json({
      success: true,
      data: {
        categories,
        subcategories,
      },
    })
  } catch (error) {
    next(error)
  }
}
