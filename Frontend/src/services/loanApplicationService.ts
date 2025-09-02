const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface LoanApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  maritalStatus?: string
  nationality?: string

  // Contact Information
  email: string
  primaryPhone: string
  alternatePhone?: string
  permanentAddress: string
  district?: string

  // Identification
  citizenshipNo: string

  // Employment Information
  occupation: string
  monthlyIncome: string
  employerName?: string
  totalIncome?: string

  // Loan Information
  loanType: string
  loanAmount: string
  loanPurpose: string
  loanTerm: string
  preferredEMI?: string

  // File uploads
  profilePhoto?: File
  citizenshipFront?: File
  citizenshipBack?: File
  incomeProof?: File
}

export interface LoanApplication
  extends Omit<LoanApplicationData, "profilePhoto" | "citizenshipFront" | "citizenshipBack" | "incomeProof"> {
  _id: string
  // Uploaded Files (as URLs)
  profilePhoto?: string
  citizenshipFront?: string
  citizenshipBack?: string
  incomeProof?: string

  // Application Status
  status: "pending" | "under-review" | "approved" | "rejected"
  submittedAt: string
  updatedAt: string
}

class LoanApplicationService {
  private async makeRequest(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || "Request failed")
    }

    return response.json()
  }

  async submitApplication(data: LoanApplicationData): Promise<{ message: string; application: LoanApplication }> {
    const formData = new FormData()

    // Add all text fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !(value instanceof File)) {
        formData.append(key, String(value))
      }
    })

    // Add file fields to FormData
    const fileFields = ["profilePhoto", "citizenshipFront", "citizenshipBack", "incomeProof"]

    fileFields.forEach((field) => {
      const file = data[field as keyof LoanApplicationData] as File
      if (file instanceof File) {
        formData.append(field, file)
      }
    })

    return this.makeRequest("/api/loan-applications", {
      method: "POST",
      body: formData,
    })
  }

  async getApplications(status?: string, search?: string): Promise<LoanApplication[]> {
    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    if (search) params.append("search", search)

    const queryString = params.toString()
    return this.makeRequest(`/api/loan-applications${queryString ? `?${queryString}` : ""}`)
  }

  async getApplication(id: string): Promise<LoanApplication> {
    return this.makeRequest(`/api/loan-applications/${id}`)
  }

  async updateApplicationStatus(
    id: string,
    status: LoanApplication["status"],
  ): Promise<{ message: string; application: LoanApplication }> {
    return this.makeRequest(`/api/loan-applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
  }

  async deleteApplication(id: string): Promise<{ message: string }> {
    return this.makeRequest(`/api/loan-applications/${id}`, {
      method: "DELETE",
    })
  }
}

export const loanApplicationService = new LoanApplicationService()
