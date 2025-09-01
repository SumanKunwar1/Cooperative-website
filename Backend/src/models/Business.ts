import mongoose, { type Document, Schema } from "mongoose"

export interface IBusiness extends Document {
  name: string
  category: string
  subcategory: string
  description: string
  image: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  website?: string
  services: string[]
  isVerified: boolean
  owner: string
  address: string
  status: "active" | "inactive" | "pending"
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const BusinessSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [100, "Business name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Technology",
        "Food & Beverage",
        "Hospitality",
        "Home Services",
        "Retail",
        "Healthcare",
        "Education",
        "Others",
      ],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, "Reviews count cannot be less than 0"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    website: {
      type: String,
      default: "",
    },
    services: [
      {
        type: String,
        trim: true,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
      required: [true, "Owner name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better search performance
BusinessSchema.index({ name: "text", description: "text", services: "text" })
BusinessSchema.index({ category: 1, subcategory: 1 })
BusinessSchema.index({ isVerified: 1, status: 1 })

export default mongoose.model<IBusiness>("Business", BusinessSchema)
