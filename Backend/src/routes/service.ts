// FILE: backend/routes/services.ts

import express from "express"
import {
  // Saving Schemes
  getAllSavingSchemes,
  getSavingSchemeById,
  createSavingScheme,
  updateSavingScheme,
  deleteSavingScheme,
  reorderSavingSchemes,
  // Loan Schemes
  getAllLoanSchemes,
  getLoanSchemeById,
  createLoanScheme,
  updateLoanScheme,
  deleteLoanScheme,
  reorderLoanSchemes,
  // Additional Facilities
  getAllAdditionalFacilities,
  getAdditionalFacilityById,
  createAdditionalFacility,
  updateAdditionalFacility,
  deleteAdditionalFacility,
  reorderAdditionalFacilities,
  // Combined
  getAllServices,
} from "../controllers/serviceController"

const router = express.Router()

// ==================== PUBLIC ROUTES ====================
// These routes are accessible to all users

// Get all services (combined) - MUST come before other routes
router.get("/all", getAllServices)

// ==================== SAVING SCHEMES ====================
// Reorder must come BEFORE :id routes to avoid treating "reorder" as an ID
router.put("/saving-schemes/reorder", reorderSavingSchemes)

// Saving Schemes - Public
router.get("/saving-schemes", getAllSavingSchemes)
router.post("/saving-schemes", createSavingScheme) // Admin
router.get("/saving-schemes/:id", getSavingSchemeById)
router.put("/saving-schemes/:id", updateSavingScheme) // Admin
router.delete("/saving-schemes/:id", deleteSavingScheme) // Admin

// ==================== LOAN SCHEMES ====================
// Reorder must come BEFORE :id routes
router.put("/loan-schemes/reorder", reorderLoanSchemes)

// Loan Schemes - Public
router.get("/loan-schemes", getAllLoanSchemes)
router.post("/loan-schemes", createLoanScheme) // Admin
router.get("/loan-schemes/:id", getLoanSchemeById)
router.put("/loan-schemes/:id", updateLoanScheme) // Admin
router.delete("/loan-schemes/:id", deleteLoanScheme) // Admin

// ==================== ADDITIONAL FACILITIES ====================
// Reorder must come BEFORE :id routes
router.put("/additional-facilities/reorder", reorderAdditionalFacilities)

// Additional Facilities - Public
router.get("/additional-facilities", getAllAdditionalFacilities)
router.post("/additional-facilities", createAdditionalFacility) // Admin
router.get("/additional-facilities/:id", getAdditionalFacilityById)
router.put("/additional-facilities/:id", updateAdditionalFacility) // Admin
router.delete("/additional-facilities/:id", deleteAdditionalFacility) // Admin

export default router