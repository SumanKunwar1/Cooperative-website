const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface MediaItem {
  _id: string
  type: "image" | "video"
  url: string
  publicId: string
  originalName: string
  size: number
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

// Get published events for public gallery
export const getPublicEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/api/gallery/public`)
  if (!response.ok) throw new Error("Failed to fetch public events")
  return response.json()
}

// Get all events for admin
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/api/gallery`)
  if (!response.ok) throw new Error("Failed to fetch events")
  return response.json()
}

// Create new event
export const createEvent = async (eventData: { name: string; description: string; date: string }): Promise<Event> => {
  const response = await fetch(`${API_URL}/api/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  })
  if (!response.ok) throw new Error("Failed to create event")
  return response.json()
}

// Update event
export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
  const response = await fetch(`${API_URL}/api/gallery/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  })
  if (!response.ok) throw new Error("Failed to update event")
  return response.json()
}

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/gallery/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete event")
}

// Upload media to event
export const uploadMedia = async (eventId: string, files: FileList): Promise<Event> => {
  const formData = new FormData()
  Array.from(files).forEach((file) => formData.append("media", file))

  const response = await fetch(`${API_URL}/api/gallery/${eventId}/media`, {
    method: "POST",
    body: formData,
  })
  if (!response.ok) throw new Error("Failed to upload media")
  return response.json()
}

// Delete media from event
export const deleteMedia = async (eventId: string, mediaId: string): Promise<Event> => {
  const response = await fetch(`${API_URL}/api/gallery/${eventId}/media/${mediaId}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete media")
  return response.json()
}
