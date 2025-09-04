// API utility functions for business management
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: string[]
}

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
  pricing?: { [key: string]: string }
  openingHours?: { [key: string]: string }
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
  pricing?: { [key: string]: string }
  openingHours?: { [key: string]: string }
  isVerified: boolean
  owner: string
  status: "active" | "inactive" | "pending"
}

// Fetch all businesses for admin
export const fetchAllBusinesses = async (): Promise<Business[]> => {
  const response = await fetch(`${API_BASE_URL}/api/business-details/admin`)

  if (!response.ok) {
    throw new Error(`Failed to fetch businesses: ${response.statusText}`)
  }

  const result: ApiResponse<Business[]> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch businesses")
  }

  return result.data || []
}

// Fetch business by ID
export const fetchBusinessById = async (id: string): Promise<Business> => {
  const response = await fetch(`${API_BASE_URL}/api/business-details/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch business: ${response.statusText}`)
  }

  const result: ApiResponse<Business> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch business")
  }

  if (!result.data) {
    throw new Error("Business not found")
  }

  return result.data
}

// Create new business
export const createBusiness = async (businessData: BusinessFormData): Promise<Business> => {
  const response = await fetch(`${API_BASE_URL}/api/business-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...businessData,
      createdBy: "admin",
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create business: ${response.statusText}`)
  }

  const result: ApiResponse<Business> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to create business")
  }

  if (!result.data) {
    throw new Error("Failed to create business")
  }

  return result.data
}

// Update business
export const updateBusiness = async (id: string, businessData: BusinessFormData): Promise<Business> => {
  const response = await fetch(`${API_BASE_URL}/api/business-details/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(businessData),
  })

  if (!response.ok) {
    throw new Error(`Failed to update business: ${response.statusText}`)
  }

  const result: ApiResponse<Business> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to update business")
  }

  if (!result.data) {
    throw new Error("Failed to update business")
  }

  return result.data
}

// Delete business
export const deleteBusiness = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/business-details/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete business: ${response.statusText}`)
  }

  const result: ApiResponse<null> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to delete business")
  }
}

// Search businesses (for public directory)
export const searchBusinesses = async (params: {
  q?: string
  category?: string
  location?: string
  page?: number
  limit?: number
}): Promise<{
  docs: Business[]
  total: number
  page: number
  pages: number
  limit: number
}> => {
  const searchParams = new URLSearchParams()

  if (params.q) searchParams.append("q", params.q)
  if (params.category) searchParams.append("category", params.category)
  if (params.location) searchParams.append("location", params.location)
  if (params.page) searchParams.append("page", params.page.toString())
  if (params.limit) searchParams.append("limit", params.limit.toString())

  const response = await fetch(`${API_BASE_URL}/api/business-details/search?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Failed to search businesses: ${response.statusText}`)
  }

  const result: ApiResponse<{
    docs: Business[]
    total: number
    page: number
    pages: number
    limit: number
  }> = await response.json()

  if (!result.success) {
    throw new Error(result.message || "Failed to search businesses")
  }

  if (!result.data) {
    throw new Error("Failed to search businesses")
  }

  return result.data
}
