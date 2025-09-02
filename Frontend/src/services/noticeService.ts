import { Notice, NoticeFormData } from "../types/notice"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

class NoticeService {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/notices`
  }

  async getAllNotices(filters?: {
    type?: string
    status?: string
    important?: boolean
    search?: string
  }): Promise<Notice[]> {
    const params = new URLSearchParams()
    
    if (filters?.type) params.append("type", filters.type)
    if (filters?.status) params.append("status", filters.status)
    if (filters?.important !== undefined) params.append("important", filters.important.toString())
    if (filters?.search) params.append("search", filters.search)

    const response = await fetch(`${this.baseUrl}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async getNoticeById(id: string): Promise<Notice> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async createNotice(formData: NoticeFormData, file?: File): Promise<Notice> {
    const formDataToSend = new FormData()
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    })
    
    // Append file if provided
    if (file) {
      formDataToSend.append("document", file)
    }

    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: formDataToSend,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async updateNotice(id: string, formData: Partial<NoticeFormData>, file?: File): Promise<Notice> {
    const formDataToSend = new FormData()
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    })
    
    // Append file if provided
    if (file) {
      formDataToSend.append("document", file)
    }

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: formDataToSend,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async deleteNotice(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }

  async getPublicNotices(filters?: {
    type?: string
    search?: string
  }): Promise<Notice[]> {
    const params = new URLSearchParams()
    
    if (filters?.type) params.append("type", filters.type)
    if (filters?.search) params.append("search", filters.search)

    const response = await fetch(`${this.baseUrl}/public?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }
}

export const noticeService = new NoticeService()
export type { Notice, NoticeFormData }