import mongoose, { Document, Schema } from "mongoose"

export interface INotice extends Document {
  title: string
  content: string
  date: string
  type: "announcement" | "news" | "circular"
  important: boolean
  documentUrl?: string
  documentType?: "pdf" | "doc" | "docx" | "jpg" | "png"
  status: "published" | "draft" | "archived"
  author: string
  createdAt: Date
  updatedAt: Date
}

const NoticeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["announcement", "news", "circular"],
      required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    documentUrl: {
      type: String,
      default: null,
    },
    documentType: {
      type: String,
      enum: ["pdf", "doc", "docx", "jpg", "png"],
      default: null,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Convert createdAt to string format for frontend
NoticeSchema.virtual("createdAtFormatted").get(function (this: any) {
  return this.createdAt.toISOString().split("T")[0]
})

// Convert updatedAt to string format for frontend
NoticeSchema.virtual("updatedAtFormatted").get(function (this: any) {
  return this.updatedAt.toISOString().split("T")[0]
})

// Ensure virtual fields are serialized
NoticeSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc: any, ret: any) {
    // Create a new object without _id and __v
    const { _id, __v, ...rest } = ret
    return rest
  },
})

export default mongoose.model<INotice>("Notice", NoticeSchema)