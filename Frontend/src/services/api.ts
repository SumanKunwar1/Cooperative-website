// FILE: frontend/src/services/api.ts

import axios from "axios"

// ============================================
// API Configuration
// ============================================
// Using hardcoded URL that works with your backend
// Backend is at: http://localhost:5000
// All API routes are under: /api prefix
// Full API base URL: http://localhost:5000/api

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Log for debugging
console.log("API Client initialized with baseURL: http://localhost:5000/api")

// Services API
export const servicesAPI = {
  // Get all services
  getAllServices: async (activeOnly = true) => {
    const response = await apiClient.get(`/services/all`, {
      params: { active: activeOnly },
    })
    return response.data
  },

  // Saving Schemes
  getSavingSchemes: async (activeOnly = true) => {
    const response = await apiClient.get("/services/saving-schemes", {
      params: { active: activeOnly },
    })
    return response.data
  },

  getSavingSchemeById: async (id: string) => {
    const response = await apiClient.get(`/services/saving-schemes/${id}`)
    return response.data
  },

  createSavingScheme: async (data: any) => {
    const response = await apiClient.post("/services/saving-schemes", data)
    return response.data
  },

  updateSavingScheme: async (id: string, data: any) => {
    const response = await apiClient.put(`/services/saving-schemes/${id}`, data)
    return response.data
  },

  deleteSavingScheme: async (id: string) => {
    const response = await apiClient.delete(`/services/saving-schemes/${id}`)
    return response.data
  },

  reorderSavingSchemes: async (schemes: { id: string; order: number }[]) => {
    const response = await apiClient.put("/services/saving-schemes/reorder", { schemes })
    return response.data
  },

  // Loan Schemes
  getLoanSchemes: async (activeOnly = true) => {
    const response = await apiClient.get("/services/loan-schemes", {
      params: { active: activeOnly },
    })
    return response.data
  },

  getLoanSchemeById: async (id: string) => {
    const response = await apiClient.get(`/services/loan-schemes/${id}`)
    return response.data
  },

  createLoanScheme: async (data: any) => {
    const response = await apiClient.post("/services/loan-schemes", data)
    return response.data
  },

  updateLoanScheme: async (id: string, data: any) => {
    const response = await apiClient.put(`/services/loan-schemes/${id}`, data)
    return response.data
  },

  deleteLoanScheme: async (id: string) => {
    const response = await apiClient.delete(`/services/loan-schemes/${id}`)
    return response.data
  },

  reorderLoanSchemes: async (schemes: { id: string; order: number }[]) => {
    const response = await apiClient.put("/services/loan-schemes/reorder", { schemes })
    return response.data
  },

  // Additional Facilities
  getAdditionalFacilities: async (activeOnly = true) => {
    const response = await apiClient.get("/services/additional-facilities", {
      params: { active: activeOnly },
    })
    return response.data
  },

  getAdditionalFacilityById: async (id: string) => {
    const response = await apiClient.get(`/services/additional-facilities/${id}`)
    return response.data
  },

  createAdditionalFacility: async (data: any) => {
    const response = await apiClient.post("/services/additional-facilities", data)
    return response.data
  },

  updateAdditionalFacility: async (id: string, data: any) => {
    const response = await apiClient.put(`/services/additional-facilities/${id}`, data)
    return response.data
  },

  deleteAdditionalFacility: async (id: string) => {
    const response = await apiClient.delete(`/services/additional-facilities/${id}`)
    return response.data
  },

  reorderAdditionalFacilities: async (facilities: { id: string; order: number }[]) => {
    const response = await apiClient.put("/services/additional-facilities/reorder", { facilities })
    return response.data
  },
}

export default apiClient