import mongoose, { type Document, Schema } from "mongoose"

export interface IBusinessDetail extends Document {
  _id: string
  name: string
  slug: string
  description: string
  fullDescription?: string
  category: string
  subcategory?: string
  services: string[]
  contactInfo: {
    phone: string
    email: string
    website?: string
    address: string
  }
  phone?: string
  email?: string
  website?: string
  address?: string
  location?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  image?: string
  images: string[]
  gallery?: string[]
  businessHours: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  openingHours?: { [key: string]: string }
  features?: string[]
  pricing?: any[]
  owner: mongoose.Types.ObjectId
  status: "active" | "inactive" | "pending"
  isVerified: boolean
  rating?: number
  reviewCount?: number
  createdAt: Date
  updatedAt: Date
}

const BusinessDetailSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    services: [
      {
        type: String,
        trim: true,
      },
    ],
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
    },
    phone: String,
    email: String,
    website: String,
    address: String,
    location: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },
    image: String,
    images: [
      {
        type: String,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
    businessHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String,
    },
    openingHours: {
      type: Schema.Types.Mixed,
    },
    features: [String],
    pricing: [Schema.Types.Mixed],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create index for search functionality
BusinessDetailSchema.index({ name: "text", description: "text", services: "text" })
BusinessDetailSchema.index({ slug: 1 })
BusinessDetailSchema.index({ owner: 1 })
BusinessDetailSchema.index({ status: 1 })

export default mongoose.model<IBusinessDetail>("BusinessDetail", BusinessDetailSchema)
