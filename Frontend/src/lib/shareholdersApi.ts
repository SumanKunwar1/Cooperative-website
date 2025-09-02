const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface Shareholder {
  _id: string
  name: string
  picture: string
  position: string
  companyName: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

export interface ShareholderStats {
  totalShareholders: number
  boardMembers: number
  withEmail: number
  withPhone: number
}

export interface CreateShareholderData {
  name: string
  position: string
  companyName: string
  email: string
  phoneNumber: string
  picture?: File
}

export interface UpdateShareholderData extends CreateShareholderData {
  _id: string
}

class ShareholdersAPI {
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async getAllShareholders(search?: string): Promise<Shareholder[]> {
    const url = new URL(`${API_BASE_URL}/api/shareholders`)
    if (search) {
      url.searchParams.append("search", search)
    }

    const response = await fetch(url.toString())
    return this.handleResponse(response)
  }

  async getShareholderById(id: string): Promise<Shareholder> {
    const response = await fetch(`${API_BASE_URL}/api/shareholders/${id}`)
    return this.handleResponse(response)
  }

  async getStatistics(): Promise<ShareholderStats> {
    const response = await fetch(`${API_BASE_URL}/api/shareholders/statistics`)
    return this.handleResponse(response)
  }

  async createShareholder(data: CreateShareholderData): Promise<Shareholder> {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("position", data.position)
    formData.append("companyName", data.companyName)
    formData.append("email", data.email)
    formData.append("phoneNumber", data.phoneNumber)

    if (data.picture) {
      formData.append("picture", data.picture)
    }

    const response = await fetch(`${API_BASE_URL}/api/shareholders`, {
      method: "POST",
      body: formData,
    })
    return this.handleResponse(response)
  }

  async updateShareholder(data: UpdateShareholderData): Promise<Shareholder> {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("position", data.position)
    formData.append("companyName", data.companyName)
    formData.append("email", data.email)
    formData.append("phoneNumber", data.phoneNumber)

    if (data.picture) {
      formData.append("picture", data.picture)
    }

    const response = await fetch(`${API_BASE_URL}/api/shareholders/${data._id}`, {
      method: "PUT",
      body: formData,
    })
    return this.handleResponse(response)
  }

  async deleteShareholder(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/shareholders/${id}`, {
      method: "DELETE",
    })
    return this.handleResponse(response)
  }
}

export const shareholdersAPI = new ShareholdersAPI()
