// API configuration and service functions for gallery
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface MediaItem {
  _id?: string
  public_id: string
  url: string
  type: "image" | "video"
  name: string
  size: string
  uploadedAt: Date
}

export interface Event {
  _id: string
  name: string
  description: string
  date: string
  media: MediaItem[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

class GalleryAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/api/gallery${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Admin: Get all events
  async getAllEvents(): Promise<Event[]> {
    return this.request<Event[]>("")
  }

  // Public: Get published events
  async getPublishedEvents(): Promise<Event[]> {
    return this.request<Event[]>("/public")
  }

  // Get single event
  async getEvent(id: string): Promise<Event> {
    return this.request<Event>(`/${id}`)
  }

  // Admin: Create new event
  async createEvent(eventData: { name: string; description: string; date: string }): Promise<Event> {
    return this.request<Event>("", {
      method: "POST",
      body: JSON.stringify(eventData),
    })
  }

  // Admin: Update event
  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    return this.request<Event>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    })
  }

  // Admin: Delete event
  async deleteEvent(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/${id}`, {
      method: "DELETE",
    })
  }

  // Admin: Upload media to event
  async uploadMedia(eventId: string, file: File): Promise<MediaItem> {
    const formData = new FormData()
    formData.append("media", file)

    const response = await fetch(`${API_BASE_URL}/api/gallery/${eventId}/media`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Upload failed" }))
      throw new Error(error.message || `Upload failed! status: ${response.status}`)
    }

    return response.json()
  }

  // Admin: Delete media from event
  async deleteMedia(eventId: string, mediaId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/${eventId}/media/${mediaId}`, {
      method: "DELETE",
    })
  }
}

export const galleryAPI = new GalleryAPI()
