// FILE: backend/models/Service.ts

import mongoose, { Document, Schema } from "mongoose"

// Interface for Saving Scheme
export interface ISavingScheme extends Document {
  title: string
  icon: string
  minDeposit: string
  minBalance: string
  interestRate: string
  maxWithdrawal: string
  targetGroup: string
  features: string[]
  color: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// Interface for Loan Scheme
export interface ILoanScheme extends Document {
  type: string
  icon: string
  rates: Map<string, string>
  description: string
  features: string[]
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// Interface for Additional Facility
export interface IAdditionalFacility extends Document {
  title: string
  description: string
  icon: string
  features: string[]
  playStoreLink?: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// Saving Scheme Schema
const savingSchemeSchema = new Schema<ISavingScheme>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    minDeposit: {
      type: String,
      required: [true, "Minimum deposit is required"],
      trim: true,
    },
    minBalance: {
      type: String,
      required: [true, "Minimum balance is required"],
      trim: true,
    },
    interestRate: {
      type: String,
      required: [true, "Interest rate is required"],
      trim: true,
    },
    maxWithdrawal: {
      type: String,
      required: [true, "Maximum withdrawal is required"],
      trim: true,
    },
    targetGroup: {
      type: String,
      required: [true, "Target group is required"],
      trim: true,
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "At least one feature is required",
      },
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      enum: ["green", "purple", "orange", "red", "indigo", "blue", "yellow"],
      default: "green",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Loan Scheme Schema
const loanSchemeSchema = new Schema<ILoanScheme>(
  {
    type: {
      type: String,
      required: [true, "Loan type is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    rates: {
      type: Map,
      of: String,
      required: [true, "Interest rates are required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "At least one feature is required",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Additional Facility Schema
const additionalFacilitySchema = new Schema<IAdditionalFacility>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "At least one feature is required",
      },
    },
    playStoreLink: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better query performance
savingSchemeSchema.index({ isActive: 1, order: 1 })
loanSchemeSchema.index({ isActive: 1, order: 1 })
additionalFacilitySchema.index({ isActive: 1, order: 1 })

// Export models
export const SavingScheme = mongoose.model<ISavingScheme>("SavingScheme", savingSchemeSchema)
export const LoanScheme = mongoose.model<ILoanScheme>("LoanScheme", loanSchemeSchema)
export const AdditionalFacility = mongoose.model<IAdditionalFacility>("AdditionalFacility", additionalFacilitySchema)