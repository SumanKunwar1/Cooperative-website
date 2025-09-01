const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export interface LoanApplication {
  _id: string
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

  // Uploaded Files
  profilePhoto?: string
  citizenshipFront?: string
  citizenshipBack?: string
  incomeProof?: string

  // Application Status
  status: "pending" | "under-review" | "approved" | "rejected"
  submittedAt: string
  updatedAt: string
}

export class LoanApplicationService {
  static async submitApplication(
    formData: any,
    files: any,
  ): Promise<{ success: boolean; message: string; application?: LoanApplication }> {
    try {
      const submitData = new FormData()

      // Add form data
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          submitData.append(key, formData[key])
        }
      })

      // Add files
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          submitData.append(key, files[key])
        }
      })

      const response = await fetch(`${API_BASE_URL}/loan-applications`, {
        method: "POST",
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application")
      }

      return {
        success: true,
        message: result.message,
        application: result.application,
      }
    } catch (error) {
      console.error("Error submitting loan application:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit application",
      }
    }
  }

  static async getAllApplications(): Promise<LoanApplication[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/loan-applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch applications")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching loan applications:", error)
      return []
    }
  }

  static async getApplication(id: string): Promise<LoanApplication | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/loan-applications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch application")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching loan application:", error)
      return null
    }
  }

  static async updateApplicationStatus(id: string, status: LoanApplication["status"]): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/loan-applications/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      })

      return response.ok
    } catch (error) {
      console.error("Error updating loan application status:", error)
      return false
    }
  }
}
