// Business type definition that matches the backend IBusiness interface
export interface Business {
  _id: string // Added _id property for MongoDB documents
  id?:string
  businessName: string
  category: string
  subcategory: string
  description: string
  fullDescription: string
  image: string
  gallery: string[]
  rating: number
  reviews: number
  location: string
  address: string
  phone: string
  email: string
  website?: string
  services: string[]
  isVerified: boolean
  owner: string
  openingHours: { [key: string]: string }
  features: string[]
  pricing: Pricing[]
  status: "active" | "inactive" | "pending"
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Pricing {
  service: string
  price: string
  description: string
}
