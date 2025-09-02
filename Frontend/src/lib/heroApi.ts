const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface MediaItem {
  type: "image" | "video"
  url: string
  alt: string
  public_id?: string
}

export interface HeroContent {
  _id?: string
  title: {
    line1: string
    line2: string
    line3: string
  }
  description: string
  backgroundMedia: MediaItem[]
  currentMediaIndex: number
  searchPlaceholder: string
  statistics: {
    businesses: { count: string; label: string }
    members: { count: string; label: string }
    services: { count: string; label: string }
    loans: { count: string; label: string }
  }
  ctaButtons: {
    primary: { text: string; action: string }
    secondary: { text: string; action: string }
  }
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

// Helper function to add cache-busting timestamp
const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}_t=${Date.now()}`
}

// Helper function to create request headers with cache control
const getHeaders = (includeCache = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (includeCache) {
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    headers['Pragma'] = 'no-cache'
    headers['Expires'] = '0'
  }
  
  return headers
}

export const heroAPI = {
  // Get active hero content (public) - with cache busting
  getActiveHeroContent: async (bustCache = false): Promise<HeroContent> => {
    const url = bustCache ? 
      addCacheBuster(`${API_URL}/api/hero/public/active`) : 
      `${API_URL}/api/hero/public/active`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(bustCache),
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch active hero content")
    }
    
    const data = await response.json()
    console.log('[API] Fetched active hero content:', data)
    return data
  },

  // Get all hero content (admin) - with cache busting
  getAllHeroContent: async (): Promise<HeroContent[]> => {
    const response = await fetch(addCacheBuster(`${API_URL}/api/hero`), {
      method: 'GET',
      headers: getHeaders(true),
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch hero content")
    }
    
    const data = await response.json()
    console.log('[API] Fetched all hero content:', data)
    return data
  },

  // Get hero content by ID
  getHeroContentById: async (id: string): Promise<HeroContent> => {
    const response = await fetch(addCacheBuster(`${API_URL}/api/hero/${id}`), {
      method: 'GET',
      headers: getHeaders(true),
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch hero content")
    }
    
    const data = await response.json()
    console.log('[API] Fetched hero content by ID:', data)
    return data
  },

  // Create hero content
  createHeroContent: async (heroData: Partial<HeroContent>): Promise<HeroContent> => {
    console.log('[API] Creating hero content:', heroData)
    
    const response = await fetch(`${API_URL}/api/hero`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(heroData),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Create hero content failed:', errorText)
      throw new Error("Failed to create hero content")
    }
    
    const data = await response.json()
    console.log('[API] Created hero content:', data)
    return data
  },

  // Update hero content
  updateHeroContent: async (id: string, heroData: Partial<HeroContent>): Promise<HeroContent> => {
    console.log('[API] Updating hero content:', id, heroData)
    
    const response = await fetch(`${API_URL}/api/hero/${id}`, {
      method: "PUT",
      headers: getHeaders(false),
      body: JSON.stringify(heroData),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Update hero content failed:', errorText)
      throw new Error("Failed to update hero content")
    }
    
    const data = await response.json()
    console.log('[API] Updated hero content:', data)
    return data
  },

  // Upload media to hero content
  uploadHeroMedia: async (id: string, file: File): Promise<MediaItem> => {
    console.log('[API] Uploading media file:', file.name, 'to hero:', id)
    
    const formData = new FormData()
    formData.append("media", file)

    const response = await fetch(`${API_URL}/api/hero/${id}/media`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type for FormData, let browser set it with boundary
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Upload media failed:', errorText)
      throw new Error("Failed to upload media")
    }
    
    const data = await response.json()
    console.log('[API] Uploaded media:', data)
    return data
  },

  // Delete media from hero content
  deleteHeroMedia: async (id: string, mediaIndex: number): Promise<void> => {
    console.log('[API] Deleting media at index:', mediaIndex, 'from hero:', id)
    
    const response = await fetch(`${API_URL}/api/hero/${id}/media/${mediaIndex}`, {
      method: "DELETE",
      headers: getHeaders(false),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Delete media failed:', errorText)
      throw new Error("Failed to delete media")
    }
    
    console.log('[API] Successfully deleted media at index:', mediaIndex)
  },

  // Delete hero content
  deleteHeroContent: async (id: string): Promise<void> => {
    console.log('[API] Deleting hero content:', id)
    
    const response = await fetch(`${API_URL}/api/hero/${id}`, {
      method: "DELETE",
      headers: getHeaders(false),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Delete hero content failed:', errorText)
      throw new Error("Failed to delete hero content")
    }
    
    console.log('[API] Successfully deleted hero content:', id)
  },
}