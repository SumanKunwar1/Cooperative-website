const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface AccountApplicationData {
  // Personal Information
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  gender: string
  maritalStatus?: string
  nationality: string
  religion?: string

  // Contact Information
  email: string
  primaryPhone: string
  alternatePhone?: string
  permanentAddress: string
  temporaryAddress?: string
  district: string
  municipality?: string
  wardNo?: string

  // Identification
  citizenshipNo?: string
  passportNo?: string
  panNo?: string

  // Employment Information
  occupation: string
  employerName?: string
  monthlyIncome: string
  incomeSource?: string

  // Family Information
  fatherName?: string
  motherName?: string
  spouseName?: string

  // Emergency Contact
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelation?: string

  // Account Details
  accountType: string
  initialDeposit: string
  depositFrequency?: string

  // Nominee Information
  nomineeName?: string
  nomineeRelation?: string
  nomineePhone?: string
  nomineeAddress?: string

  // References
  reference1Name?: string
  reference1Phone?: string
  reference1Address?: string
  reference2Name?: string
  reference2Phone?: string
  reference2Address?: string

  // File uploads
  profilePhoto?: File
  citizenshipFront?: File
  citizenshipBack?: File
  passport?: File
  panCard?: File
  incomeProof?: File
  bankStatement?: File
  nomineePhoto?: File
}

export interface AccountApplication
  extends Omit<
    AccountApplicationData,
    | "profilePhoto"
    | "citizenshipFront"
    | "citizenshipBack"
    | "passport"
    | "panCard"
    | "incomeProof"
    | "bankStatement"
    | "nomineePhoto"
  > {
  _id: string
  profilePhoto?: string
  citizenshipFront?: string
  citizenshipBack?: string
  passport?: string
  panCard?: string
  incomeProof?: string
  bankStatement?: string
  nomineePhoto?: string
  status: "pending" | "under-review" | "approved" | "rejected"
  submittedAt: string
  updatedAt: string
}

class AccountApplicationService {
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

  async submitApplication(data: AccountApplicationData): Promise<{ message: string; application: AccountApplication }> {
    const formData = new FormData()

    // Add all text fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !(value instanceof File)) {
        formData.append(key, String(value))
      }
    })

    // Add file fields to FormData
    const fileFields = [
      "profilePhoto",
      "citizenshipFront",
      "citizenshipBack",
      "passport",
      "panCard",
      "incomeProof",
      "bankStatement",
      "nomineePhoto",
    ]

    fileFields.forEach((field) => {
      const file = data[field as keyof AccountApplicationData] as File
      if (file instanceof File) {
        formData.append(field, file)
      }
    })

    return this.makeRequest("/api/account-applications", {
      method: "POST",
      body: formData,
    })
  }

  async getApplications(status?: string, search?: string): Promise<AccountApplication[]> {
    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    if (search) params.append("search", search)

    const queryString = params.toString()
    return this.makeRequest(`/api/account-applications${queryString ? `?${queryString}` : ""}`)
  }

  async getApplication(id: string): Promise<AccountApplication> {
    return this.makeRequest(`/api/account-applications/${id}`)
  }

  async updateApplicationStatus(
    id: string,
    status: AccountApplication["status"],
  ): Promise<{ message: string; application: AccountApplication }> {
    return this.makeRequest(`/api/account-applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
  }

  async deleteApplication(id: string): Promise<{ message: string }> {
    return this.makeRequest(`/api/account-applications/${id}`, {
      method: "DELETE",
    })
  }
}

export const accountApplicationService = new AccountApplicationService()