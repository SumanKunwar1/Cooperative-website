// types/business.ts
export interface Business {
  _id: string
  id: string
  name: string
  businessName?: string
  category: string
  subcategory: string
  description: string
  fullDescription?: string
  image: string
  gallery?: string[]
  rating: number
  reviews: number
  location: string
  address: string
  phone: string
  email: string
  website?: string
  services: string[]
  pricing?: {
    basic?: string | number
    standard?: string | number
    premium?: string | number
    [key: string]: string | number | undefined
  }
  openingHours?: {
    [day: string]: string
  }
  isVerified: boolean
  owner: string
  status: "active" | "inactive" | "pending"
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface BusinessFormData {
  name: string
  businessName?: string
  category: string
  subcategory: string
  description: string
  fullDescription?: string
  image: string
  gallery?: string[]
  rating: number
  reviews: number
  location: string
  address: string
  phone: string
  email: string
  website?: string
  services: string[]
  pricing?: {
    basic?: string | number
    standard?: string | number
    premium?: string | number
    [key: string]: string | number | undefined
  }
  openingHours?: {
    [day: string]: string
  }
  isVerified: boolean
  owner: string
  status: "active" | "inactive" | "pending"
}
