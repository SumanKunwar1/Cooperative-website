export interface Business {
  id: string
  name: string
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
  openingHours: { [key: string]: string }
  features: string[]
  pricing: { service: string; price: string; description: string }[]
}
